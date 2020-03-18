# ttjc-blog-managment-system
# an open source blog managment system

*ttjc-bms is build during the #teamtanayjobchallenge*

# Technology used

# Frontend
* Html
* css
* javascript
* bootstrap
##### backend
* nodejs
##### database
* mongodb

# features
```
|-- user
    |-add post
    |-edit post
    |-delete post
    |-list of their post
|--admin
    |-add post
    |-edit other users post
    |-delete other users post
    |-edit users
    |-delete users
    |-view the post
```


# tree of folders
``` bash
+---controller
+---db
+---models
+---public
|   +---css
|   \---scripts
+---routes
|   +---admin
|   \---home
\---templates
    +---admin
    \---partcials
```
#### live demo
[ttjc-bms](http://ttjc-blog-managment-system.herokuapp.com)

### Easy to setup
setup 2 envirnoment variables in your system
MONGODB_URL=<Your_mongodb_url>
SESSION_SEC=<your session sec>

to work with comments in post
you need account from disques.com
after getting account
change below file and code with your

/templates/post.ejs line no:33

if like it please leave review and thumbsup :-0


