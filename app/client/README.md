# start

## 環境安裝

1. 安裝docker, vscode（包含remote dev pack [安裝方法](https://code.visualstudio.com/docs/remote/containers)）, github-desktop
2. clone這個project
3. 用vscode打開project folder，會自動詢"open and build in container?"，選`yes`，等待vscode自動build好並開啟

## 啟動開發環境

```bash
# 用terminal進入container-bash
sudo docker ps -a
# 找到fullstack-tutorial的id（下面的範例為32ae50cd95fc），並將他替換
sudo docker exec -it 32ae50cd95fc /bin/bash 
```

1. 啟動client-app

```bash
cd /workspace/fullstack-tutorial/app/client
npm run start
# 啟動需要一段時間....
```

2. 啟動server-app

```bash
# 開一個新的terminal，進入container-bash
cd /workspace/fullstack-tutorial/app/server
npm run dev
# 啟動後可嘗試graphql：http://localhost:4000/graphql
```

### client playground

1. 啟動後用瀏覽器打開：http://localhost:3010/，即可看到網站
2. login帳號: aaa@aaa.com 密碼: aaa
3. vscode 打開 fullstack-tutorial/app/client/src/pages/stage.tsx，找到`const demo = (...)`，依下面指示編輯後存檔

```
const demo = (
    <>
        <h1>hello world</h1>  # 加入此行
        ...
    </>
)
```

4. 瀏覽器會自動更新頁面資訊
