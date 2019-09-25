json.id @message.id
json.name @message.user.name
json.time @message.datetime.to_s
json.content @message.content
json.image @message.image.url

datetime = DateTime.now