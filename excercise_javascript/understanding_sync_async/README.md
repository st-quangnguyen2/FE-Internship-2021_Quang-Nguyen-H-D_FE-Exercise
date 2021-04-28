## Synchronous (Đồng bộ)

Đồng bộ: Hiểu đơn giản thì đồng bộ có nghĩa là thực hiện các công việc một cách tuần tự, công việc này xong thì mới được thực hiện các công việc khác. Ví dụ có 2 công việc A và B thì khi có nghĩa là A thực hiện xong trước rồi mới tới lượt B. Như vậy tổng thời gian hoàn thành sẽ như bên dưới.

![This is sync.](/excercise_javascript/understanding_sync_async/assets/images/sync.png "This is sync image.")

## Asynchronous (Bất đồng bộ)

Bất đồng bộ: là thực hiện các công việc một cách không tuần tự.

![This is async](/excercise_javascript/understanding_sync_async/assets/images/async.png "This is async image.")

Với cách xử lý bất đồng bộ, khi A bắt đầu thực hiện, chương trình tiếp tục thực hiện B mà không đợi A kết thúc.

### Javascript hoạt động như thế nào ?

![This is event loop](/excercise_javascript/understanding_sync_async/assets/images/event-loop.gif "This is event loop gif")

```javascript
  console.log('Start');

  setTimeout(function doingTask3 () {
      console.log("Task 3"); 
  }, 4000);

  function square (x) {
      var res = x * x;
      return res;
  }

  console.log(square(9));
```

- Bước 1: `console.log('Start')` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-1.png)

- Bước 2: `console.log('Start')` được thực thi xong và bị lấy ra khỏi call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-14.png)

- Bước 3: `setTimeout` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-2.png)

- Bước 4: callback `doingTask3()` được thêm vào WebAPI và bắt đầu chờ một khoảng thời gian được khai báo trong `setTimeout`

![](/excercise_javascript/understanding_sync_async/assets/images/step-3.png)

- Bước 5: `console.log(square(9))` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-4.png)

- Bước 6: `square(9)` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-5.png)

- Bước 7: `x * x` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-6.png)

- Bước 8: `x * x` thực thi xong và được lấy ra khỏi call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-7.png)

- Bước 9: `square(9)` thực thi xong và được lấy ra khỏi call stack, `doingTask3()` hét thời gian chờ được thêm vào Callback queue

![](/excercise_javascript/understanding_sync_async/assets/images/step-8.png)

- Bước 10: `console.log(square(9))` thực thi xong và được lấy ra khỏi call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-10.png)

- Bước 11: Call stack đang rỗng nên `doingTask3()` được lấy từ Callback queue và thêm vào Call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-11.png)

- Bước 12: `console.log("Task 3")` được thêm vào call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-12.png)

- Bước 13: `console.log("Task 3")` thực thi xong và lấy ra khỏi call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-13.png)

- Bước 14: `doingTask3()` thực thi xong và lấy ra khỏi call stack

![](/excercise_javascript/understanding_sync_async/assets/images/step-14.png)


### Các cách xử lí bất đồng bộ 
#### CallBack

Callback là một hàm được truyền như một tham số của một hàm khác và chờ để được gọi vào thực thi. Với một callback có thể đảm bảo rằng function B chỉ được gọi sau khi function A kết thúc.
```
  doSomething => functionA
  callback => functionB
  function doSomething (options, callback) {
    callback (options);
  }
  doSomething(options, callback);
```
Callback thực sự rất hữu ích trong các trường hợp đơn giản, tuy nhiên mỗi callback đều thêm một mức lồng nhau và khi có nhiều callback, đoạn code sẽ bắt đầu trở nên phức tạp rất nhanh. Và gây ra callback hell.

#### Promises

Để giải quyết vấn đề Callback Hell, ES6 đã cung cấp Promse. Về khái niệm, Promise chính là "lời hứa" đại diện cho giá trị chưa tồn tại và giá trị đó sẽ được trả về vào một thời gian trong tương lai.
Tạo một Promise: 
```
  let promise = new Promise((resolve, reject) => {
    // Asynchronous Code.
  });
```
Promise sẽ nhận vào một hàm callback gồm 2 tham số như sau:
- `resolve`: một function sẽ được gọi nếu đoạn code bất đồng bộ trong Promise chạy thành công.
- `reject`: một function sẽ được gọi nếu đoạn code bất đồng bộ trong Promise có lỗi xảy ra.
Promise cũng cung cấp cho chúng ta 2 phương thức để xử lý sau khi được thực hiện:
- `then()`: Dùng để xử lý sau khi Promise được thực hiện thành công (khi `resolve` được gọi).
- `catch()`: Dùng để xử lý sau khi Promise có bất kỳ lỗi nào đó (khi `reject` được gọi).

#### async/await
Hãy tưởng tượng chúng ta muốn sử dụng một hàm **asynchronous** trong ứng dụng của mình và dựa vào output, chúng ta sẽ làm điều gì đó. Vì JavaScript là ngôn ngữ đơn luồng, non-blocking nên nó sẽ bỏ qua các hành động asynchronous để thực thi trong **run time environment** và lấy lại nó khi call stack trống.
Vì ứng dụng của chúng ta phụ thuộc vào đầu ra của hàm **asynchronous**. Đó là lí do tại sao **async/await** hoạt động

Từ khóa `async` đảm bảo rằng hàm trả về một `promise` từ khóa `await` tạm dừng việc thực thi cho đến khi `promise` được giải quyết hoặc giải quyết xong. Nó chỉ là một cách tốt hơn để viế `promise` so với `Promise.then()`.





