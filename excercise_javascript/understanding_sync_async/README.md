## Synchronous (Đồng bộ)

Đồng bộ: Hiểu đơn giản thì đồng bộ có nghĩa là thực hiện các công việc một cách tuần tự, công việc này xong thì mới được thực hiện các công việc khác. Ví dụ có 2 công việc A và B thì khi có nghĩa là A thực hiện xong trước rồi mới tới lượt B. Như vậy tổng thời gian hoàn thành sẽ như bên dưới.

![This is sync.](/assets/images/sync.png "This is sync image.")

## Asynchronous (Bất đồng bộ)

Bất đồng bộ: là thực hiện các công việc một cách không tuần tự.

![This is async](/excercise_javascript/understanding_sync_async/assets/images/async.png "This is async image.")

Với cách xử lý bất đồng bộ, khi A bắt đầu thực hiện, chương trình tiếp tục thực hiện B mà không đợi A kết thúc.

### Javascript hoạt động như thế nào ?

![This is event loop](/excercise_javascript/understanding_sync_async/assets/images/event-loop.gif "This is event loop gif")

```javascript
  console.log('Start');

  setTimeout(function doingTask3 () {
      var sum = 2 + 2;
      console.log("Task 3", sum); 
  }, 4000);

  function square (x) {
      var res = x * x;
      return res;
  }

  console.log(square(9));
```

