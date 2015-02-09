json.array!(@posts) do |post|
	json.partial!("show", post: post)
	json.comments post.comments do |comment|
		json.partial!("api/comments/comment", comment: comment)
	end
end
