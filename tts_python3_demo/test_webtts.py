
#-*- coding: utf-8 -*-
import requests
import time
import hashlib
import base64

URL = "http://api.xfyun.cn/v1/service/v1/tts"
AUE = "raw"
APPID = "5c5ecac9"
API_KEY = "4e6c0dc6b9f571e770090f0e2ded1174"

def getHeader():
        curTime = str(int(time.time()))
        #ttp=ssml
        param = "{\"aue\":\""+AUE+"\",\"auf\":\"audio/L16;rate=16000\",\"voice_name\":\"xiaoyan\",\"engine_type\":\"intp65\"}"
        print("param:{}".format(param))
        
        paramBase64 = str(base64.b64encode(param.encode('utf-8')), 'utf-8')
        print("x_param:{}".format(paramBase64))
        
        m2 = hashlib.md5()
        m2.update((API_KEY + curTime + paramBase64).encode('utf-8'))
        
        checkSum = m2.hexdigest()
        print('checkSum:{}'.format(checkSum))
        
        header ={
                'X-CurTime':curTime,
                'X-Param':paramBase64,
                'X-Appid':APPID,
                'X-CheckSum':checkSum,
                'X-Real-Ip':'127.0.0.1',
                'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        }
        print(header)
        return header

def getBody(text):
        data = {'text':text}
        return data

def writeFile(file, content):
    with open(file, 'wb') as f:
        f.write(content)
    f.close()
    

def readFile(file):
    with open(file, 'r') as f:
        txt = f.read()
    f.close()
    return txt

content = readFile("test")

print(content)

r = requests.post(URL,headers=getHeader(),data=getBody(content))

print("---------")

contentType = r.headers['Content-Type']
if contentType == "audio/mpeg":
    sid = r.headers['sid']
    if AUE == "raw":
        #print(r.content)
        writeFile("audio/"+sid+".wav", r.content)
    else :
        #print(r.content)
        writeFile("audio/"+"xiaoyan"+".mp3", r.content)
    print ("success, sid = " + sid)
else :
    print (r.text)
