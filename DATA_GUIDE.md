# GearLabGaming 数据添加指南

## Collections 信息

### 价格历史 Collection
- **ID**: `col-price-history-f9569b20b0f778402303b087040bf76b`
- **字段**:
  - `product`: 产品 ID (必填)
  - `price`: 价格 (必填)
  - `currency`: 货币 (USD/EUR/GBP)
  - `source`: 来源
  - `availability`: 库存状态
  - `discount`: 折扣百分比

### 评论 Collection
- **ID**: `col-comments-e81245abf7e0bf66081d56c5c90c75f2`
- **字段**:
  - `product`: 产品 ID
  - `article`: 文章 ID
  - `author`: 作者信息 {name, email}
  - `content`: 评论内容 (必填)
  - `rating`: 评分 (1-5)

## 添加数据示例

### 添加价格历史
```sql
INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
VALUES (
  'ph-' || lower(hex(randomblob(16))),
  'col-price-history-f9569b20b0f778402303b087040bf76b',
  'price-product-name-' || strftime('%s', 'now'),
  'Price Update - Product Name',
  '{"product":"PRODUCT_ID","price":99.99,"currency":"USD","source":"amazon","availability":"in-stock"}',
  'published',
  'usr-admin-001',
  strftime('%s', 'now'),
  strftime('%s', 'now')
);
```

### 添加评论
```sql
INSERT INTO content (id, collection_id, slug, title, data, status, author_id, created_at, updated_at)
VALUES (
  'comment-' || lower(hex(randomblob(16))),
  'col-comments-e81245abf7e0bf66081d56c5c90c75f2',
  'comment-' || strftime('%s', 'now'),
  'Comment Title',
  '{"product":"PRODUCT_ID","author":{"name":"User Name","email":"user@example.com"},"content":"Great product!","rating":5}',
  'published',
  'usr-admin-001',
  strftime('%s', 'now'),
  strftime('%s', 'now')
);
```

## 获取产品 ID
```sql
SELECT id, title FROM content WHERE collection_id = 'col-products-ce613aa5';
```

## 验证数据
- 价格历史: `https://gearlabgaming.com/api/price-history/PRODUCT_ID`
- 评论: `https://gearlabgaming.com/api/comments/product/PRODUCT_ID`
