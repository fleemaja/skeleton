json.(notification, :id, :is_read )
json.url notification.url
json.text notification.text
json.createdInt notification.created_at.to_i

