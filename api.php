<?php
declare(strict_types=1);

require_once __DIR__ . '/conexion.php';

$accion = $_GET['accion'] ?? 'catalogo';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $accion === 'catalogo') {
        $categorias = $pdo->query(
            'SELECT id_categoria, nombre, slug, tono, imagen_url, url_referencia
             FROM categorias
             ORDER BY id_categoria ASC'
        )->fetchAll();

        $productos = $pdo->query(
            'SELECT p.id_producto, p.codigo, p.nombre, p.especificacion, p.unidad,
                    p.precio_usd, p.stock, p.bloqueado, p.imagen_url,
                    c.nombre AS categoria, c.slug AS categoria_slug, c.url_referencia
             FROM productos p
             INNER JOIN categorias c ON c.id_categoria = p.id_categoria
             ORDER BY p.id_producto ASC'
        )->fetchAll();

        $sucursal = $pdo->query(
            'SELECT id_sucursal, punto_venta, referencia, direccion, ubicacion_interna,
                    zona_barrio, ciudad, telefono, whatsapp_numero
             FROM sucursales
             ORDER BY id_sucursal ASC
             LIMIT 1'
        )->fetch();

        echo json_encode([
            'ok' => true,
            'categorias' => $categorias,
            'productos' => $productos,
            'sucursal' => $sucursal
        ]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $accion === 'guardar_pedido') {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw ?: '', true);

        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
            exit;
        }

        $folio = trim((string)($data['folio'] ?? ''));
        $clienteNombre = trim((string)($data['cliente_nombre'] ?? ''));
        $clienteContacto = trim((string)($data['cliente_contacto'] ?? ''));
        $totalUsd = (float)($data['total_usd'] ?? 0);
        $estado = trim((string)($data['estado'] ?? 'Enviado a WhatsApp'));
        $items = $data['items'] ?? [];

        if ($folio === '' || $clienteNombre === '' || $clienteContacto === '' || !is_array($items) || count($items) === 0) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Datos de pedido incompletos']);
            exit;
        }

        $sucursal = $pdo->query('SELECT id_sucursal FROM sucursales ORDER BY id_sucursal ASC LIMIT 1')->fetch();
        $idSucursal = (int)($sucursal['id_sucursal'] ?? 1);

        $pdo->beginTransaction();

        $stmtPedido = $pdo->prepare(
            'INSERT INTO pedidos (id_sucursal, folio, cliente_nombre, cliente_contacto, total_usd, estado)
             VALUES (:id_sucursal, :folio, :cliente_nombre, :cliente_contacto, :total_usd, :estado)'
        );
        $stmtPedido->execute([
            ':id_sucursal' => $idSucursal,
            ':folio' => $folio,
            ':cliente_nombre' => $clienteNombre,
            ':cliente_contacto' => $clienteContacto,
            ':total_usd' => $totalUsd,
            ':estado' => $estado
        ]);

        $idPedido = (int)$pdo->lastInsertId();

        $stmtDetalle = $pdo->prepare(
            'INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario_usd, subtotal_usd)
             VALUES (:id_pedido, :id_producto, :cantidad, :precio_unitario_usd, :subtotal_usd)'
        );

        foreach ($items as $item) {
            $idProducto = (int)($item['id_producto'] ?? 0);
            $cantidad = max(1, (int)($item['cantidad'] ?? 1));
            $precioUnit = (float)($item['precio_usd'] ?? 0);
            $subtotal = round($cantidad * $precioUnit, 2);

            if ($idProducto > 0) {
                $stmtDetalle->execute([
                    ':id_pedido' => $idPedido,
                    ':id_producto' => $idProducto,
                    ':cantidad' => $cantidad,
                    ':precio_unitario_usd' => $precioUnit,
                    ':subtotal_usd' => $subtotal
                ]);
            }
        }

        $pdo->commit();

        echo json_encode([
            'ok' => true,
            'id_pedido' => $idPedido,
            'folio' => $folio
        ]);
        exit;
    }

    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'Acción no válida']);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Error en el servidor PHP',
        'detalle' => $e->getMessage()
    ]);
}