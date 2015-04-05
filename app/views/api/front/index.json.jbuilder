json.array!(@posts) do |post|
	json.partial!("api/posts/show", post: post)
end
