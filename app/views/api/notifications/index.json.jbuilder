json.array!(@notifications) do |notification|
	json.partial!("api/notifications/show", notification: notification)
end