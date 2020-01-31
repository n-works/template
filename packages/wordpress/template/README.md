# {{ PROJECT_NAME }}

## 必要な環境
* [Node.js](https://nodejs.org/ja/)
* [Yarn](https://legacy.yarnpkg.com/ja/)
* [Docker](https://www.docker.com/products/docker-desktop)

## 最初にnpmパッケージをインストール
```
yarn
```

## アセットをビルド (`Ctrl+C`で終了)
```
yarn dev
```

## Dockerコンテナを起動
```
docker-compose up -d
```

## Dockerコンテナのデータベースを保存
```
docker-compose exec -u www-data wordpress wp db export /var/www/mysql/initdb.sql
```

## Dockerコンテナを終了
```
docker-compose down -v
```
