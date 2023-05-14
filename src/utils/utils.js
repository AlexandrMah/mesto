/*---Изменение кнопки сохранения при передаче информации на сервер---*/
function renderLoading(btn, isLoading){
  if (isLoading) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохранить';;
  }
}

export default renderLoading;