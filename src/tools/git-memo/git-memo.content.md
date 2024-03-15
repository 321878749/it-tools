## Configuration

设置全局配置

```shell
git config --global user.name "[name]"
git config --global user.email "[email]"
```

## Get started

创建 git 存储库

```shell
git init
```

克隆现有的git存储库

```shell
git clone [url]
```

## Commit

提交所有修订

```shell
git commit -am "[commit message]"
```

像上次提交添加新修改

```shell
git commit --amend --no-edit
```

## I’ve made a mistake

更改上次提交信息

```shell
git commit --amend
```

撤销最近的提交并且保留更改

```shell
git reset HEAD~1
```

撤销最近的 N 次提交并保留更改

```shell
git reset HEAD~N
```

撤销最近的提交并丢弃更改。

```shell
git reset HEAD~1 --hard
```

将分支重置为远程状态。

```shell
git fetch origin
git reset --hard origin/[branch-name]
```

## Miscellaneous

将本地的 master 分支重命名为 main。








```shell
git branch -m master main
```
