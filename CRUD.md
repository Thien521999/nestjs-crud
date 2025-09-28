
- DB: SQLite
- Schema drawling tool: [dbdiagram.io](https://dbdiagram.io) (Sử dụng DBML - Database Markup Language)
- ORM: Prisma

> ORM : ORM(Object-Relational Maping) là thư viện giúp tương tác với Database thông qua ngôn ngữ lập trình (vd Javascript) mà ko cần viết câu truy vấn SQL

### Vẽ schema bằng DBML

Datatype khi code bằng DBML rất linh động, các bạn có thể gõ bất kỳ text nào mà bạn muốn. Vì vậy bình thường
dùng datatype theo Prisma để dễ hiểu hơn(Thay vì dùng datatype của sqlite)

> Prisma sẽ tự động chuyển đỗi datatype mà bạn khai báo trong schema thành datatype của database mà bạn đang dùng.

> Keyword: sqlite data types or 'các kiểu dữ liệu trong sqlite'.

<!-- Note Prisma -->

- DataType của Prisma khác DataType của CSDL

- Ghi kiểu dữ liệu của Prisma vào DBML

- Prisma sẽ tự động chuyển đổi datatype mà bạn khai báo trong schema thành datatype của database mà bạn đang dùng theo.

keyword : sqlite data types

Quan hệ giữa các bảng:

- Một người dùng có thể có nhiều post: Mối quan hệ 1-n
- Nột người dùng có thể có nhiều Refresh Token: Mối quan hệ 1-n

Mỗi bảng **Phải có** ít nhất 1 trường unique để phân biệt giữa các item với nhau.

```dbml

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Project CRUD {
  database_type: 'SQLite'
  Note: 'Sử dụng Prisma ORM. Column Type cũng theo Prisma'
}

Table User {
  id        Int     [pk, increment]
  email     String  [unique]
  name      String
  password  String
  createdAt DateTime [default : `now()`]
  updatedAt DateTime [note: '@updatedAt']
}

Table Post {
  id        Int [pk, increment]
  title     String
  content   String
  authorId  Int [ref: > User.id, delete: cascade, update: no action] // Khi người dùng xoá thì xoá hết bài post của người đó
  createdAt DateTime [default: `now()`]
  updatedAt DateTime [note: '@updatedAt']
}

Table  RefreshToken {
  token      String    [unique]  // Có thể pk cũng được , nhưng ko cần liên kết với khoá ngoại
  userId     Int       [ref: > User.id, delete: cascade, update: no action] // Khi xoá người dùng thì xoá hết token của người đó
  expiresAt  DateTime
  createdAt  DateTime  [default: `now()`]
}

Ref: Post.authorId > User.id [delete: cascade, update: no action]

Ref: users.id < follows.following_user_id

Ref: users.id < follows.followed_user_id
```

> FAQ: Trường khoá chính khác gì với trường unique trong sql?
+ Giống nhau: 2 thằng đều unique, đều có chế độ auto index.
+ Khác nhau: PK thì đem đi tạo quan hệ được, còn unique thì ko.

### Tạo schema trong Prisma

- Dành time đọc docs Prisma

- Khi đã có schema dbml thì chúng ta có generate ta prisma schema

- keyword: chuyển dbml này sang schema prisma

Các câu lệnh:
- npx prisma
- npx prisma db push
- npx prisma studio

# Giải thích một số câu lệnh Prisma CLI
> Migrate là thay đổi cấu trúc database giữa các phiên bản

Sự khác nhau giữa các câu lệnh

## `**npx prisma migrate dev**`

 - Tạo migration file từ prisma schema
 - Aplly vào database
 - Tạo ra type cho prisma client
 - Có thể dùng cho cập nhật hoặc khởi tạo db

## `npx prisma db push`

- **Không** tạo ra migration file
- Apply vào database
- Tạo ra type cho prisma client

## `npx prisma generate`

- **Không** tạo ra migration file
- **Không** apply vào database
- Tạo ra type cho prisma client (hay còn gọi là artifacts)

Lưu ý:
Khi các bạn `npm i` thì artifacts sẽ được tạo tự động
