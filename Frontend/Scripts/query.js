function AddFriend(friend_id) {
  current_user = {_id: "5726baa84ce60aff0fad7e86"}
  $.post('http://localhost:3000/appendList', {
    collection: "users",
    entity: current_user._id,
    field: "friends",
    field_vale: friend_id,
  }).done( function(data) {
    console.log(data);
  });
}