# 概要

Google App Engine(GAE)から、Google Compute Engine(GCE)のinstanceリストを取得し、UP、DOWNをするアプリです。

## 使用しているもの

https://godoc.org/google.golang.org/api/compute/v1

[twitter bootstrap](http://getbootstrap.com/) 


## 内容

### GCEのinstanceリストを取得

GAEが稼働しているProjectIDを取得し、同一ProjectにあるGCEのinstanceのリストを取得しています。

### instanceのStart、Stop

[Compute Engine API](https://godoc.org/google.golang.org/api/compute/v1) を使っています。

### External IPの取得

固定IPを使用していないため、立ち上げる毎に外部IPが変更されます。  
このIPアドレスを気にせずに利用できるようにするため、立ち上げたinstanceから取得し、画面上にリンクを表示しています。

[Compute Engine API](https://godoc.org/google.golang.org/api/compute/v1) で取得出来ますが、ちょっと奥深くにあるので苦労しました部分です。


## GECのinstanceの中身（参考）

今回使っている、GCEのinstanceは、Dockerを利用してでアプリを起動しています。

### 使用Dockerイメージ

[Jupyter](http://jupyter.org/) を使っています。

https://hub.docker.com/r/jupyter/all-spark-notebook/


pullコマンド
```
docker pull jupyter/all-spark-notebook
```

### GCEのstart-up-script

GCSに設置して利用。

```
#!/bin/bash
sudo docker restart hopeful_hawking
```

