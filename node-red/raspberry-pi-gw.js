[
    {
        "id": "5b9f94a3.ec76ec",
        "type": "bigssh",
        "z": "7204abf1.ff7124",
        "name": "",
        "commandLine": "sudo tcpdump -AUq port 1700",
        "commandArgs": "",
        "minError": 1,
        "minWarning": 1,
        "noStdin": true,
        "format": "ascii",
        "payloadIsArg": false,
        "myssh": "ac5e64fd.682818",
        "x": 284,
        "y": 101.5,
        "wires": [
            [
                "169e60.786301a1"
            ],
            [],
            []
        ]
    },
    {
        "id": "616959ee.585278",
        "type": "inject",
        "z": "7204abf1.ff7124",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 100,
        "y": 102,
        "wires": [
            [
                "5b9f94a3.ec76ec"
            ]
        ]
    },
    {
        "id": "6ccec87a.a96168",
        "type": "influxdb out",
        "z": "7204abf1.ff7124",
        "influxdb": "d7adbe37.624be",
        "name": "",
        "measurement": "gw1",
        "precision": "",
        "retentionPolicy": "",
        "x": 1014,
        "y": 146,
        "wires": []
    },
    {
        "id": "169e60.786301a1",
        "type": "switch",
        "z": "7204abf1.ff7124",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "pk",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "outputs": 2,
        "x": 454,
        "y": 99,
        "wires": [
            [
                "d7feec72.0ee2",
                "10880f1b.2ed671"
            ],
            []
        ]
    },
    {
        "id": "d7feec72.0ee2",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "rxpk Count",
        "func": "//count for rxpk messages\nvar msgcount = {};\nmsgcount.payload = msg.payload.split(\"rxpk\").length - 1;\n\n//split these messages\nmsg.payload = msg.payload.split(\"rxpk\");\n\nvar msglist = [];\n\n//\nfor(var i=1; i<msgcount.payload+1; i++)\n{\nmsglist.push({payload:msg.payload[i]});\n}\n\nreturn [msglist];",
        "outputs": 1,
        "noerr": 0,
        "x": 597.5,
        "y": 92,
        "wires": [
            [
                "11909936.0e2cc7"
            ]
        ]
    },
    {
        "id": "11909936.0e2cc7",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "var msg1 = {};\n\nmsg.payload = msg.payload.split(\",\\\"data\");\nmsg1.payload = msg.payload[0];\nmsg1.payload = msg1.payload.substring(2);\nmsg1.payload = msg1.payload + \"}]\";\n\nreturn msg1;",
        "outputs": 1,
        "noerr": 0,
        "x": 734.5,
        "y": 92,
        "wires": [
            [
                "4db1bb52.05aac4"
            ]
        ]
    },
    {
        "id": "4db1bb52.05aac4",
        "type": "json",
        "z": "7204abf1.ff7124",
        "name": "",
        "x": 853,
        "y": 91,
        "wires": [
            [
                "45fccbf0.3108b4"
            ]
        ]
    },
    {
        "id": "45fccbf0.3108b4",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "//rssi\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload[0].rssi;\n\n//snr\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload[0].lsnr;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = msg5.payload[1];\msg5.payload = parseInt(msg5.payload[1]);\n\n//chan\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload[0].chan;\n\nvar msg6 = {};\nmsg6.payload = [{\"rssi\": msg1.payload, \"snr\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 969,
        "y": 91,
        "wires": [
            [
                "6ccec87a.a96168"
            ]
        ]
    },
    {
        "id": "10880f1b.2ed671",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "txpk Count",
        "func": "//count for rxpk messages\nvar msgcount = {};\nmsgcount.payload = msg.payload.split(\"txpk\").length - 1;\n\n//split these messages\nmsg.payload = msg.payload.split(\"txpk\");\n\nvar msglist = [];\n\n//\nfor(var i=1; i<msgcount.payload+1; i++)\n{\nmsglist.push({payload:msg.payload[i]});\n}\n\nreturn [msglist];",
        "outputs": 1,
        "noerr": 0,
        "x": 597,
        "y": 185,
        "wires": [
            [
                "87bc1ccd.50921"
            ]
        ]
    },
    {
        "id": "87bc1ccd.50921",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "var msg1 = {};\n\nmsg.payload = msg.payload.split(\",\\\"data\");\nmsg1.payload = msg.payload[0];\nmsg1.payload = msg1.payload.substring(2);\nmsg1.payload = msg1.payload + \"}]\";\nmsg1.payload = \"[\" + msg1.payload;\nmsg1.payload = msg1.payload.replace(\"false\",0);\nmsg1.payload = msg1.payload.replace(\"true\",1);\nreturn msg1;",
        "outputs": 1,
        "noerr": 0,
        "x": 742,
        "y": 192,
        "wires": [
            [
                "69d06035.195a6"
            ]
        ]
    },
    {
        "id": "69d06035.195a6",
        "type": "json",
        "z": "7204abf1.ff7124",
        "name": "",
        "x": 860,
        "y": 192,
        "wires": [
            [
                "c193dfc3.b742a"
            ]
        ]
    },
    {
        "id": "c193dfc3.b742a",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "//imme\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload[0].imme;\n\n//ipol\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload[0].ipol;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = msg5.payload[1];\n\n//chan\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload[0].rfch;\n\n//powe\nvar msg8 = { payload: msg.payload.length };\nmsg8.payload = msg.payload[0].powe;\n\nvar msg6 = {};\nmsg6.payload = [{\"imme\": msg1.payload, \"ipol\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload, \"powe\": msg8.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 1008,
        "y": 199,
        "wires": [
            [
                "ac6a4259.a320c"
            ]
        ]
    },
    {
        "id": "ac6a4259.a320c",
        "type": "influxdb out",
        "z": "7204abf1.ff7124",
        "influxdb": "d7adbe37.624be",
        "name": "",
        "measurement": "gw1-out",
        "precision": "",
        "retentionPolicy": "",
        "x": 1017,
        "y": 253,
        "wires": []
    },
    {
        "id": "ac5e64fd.682818",
        "type": "SSH_Credentials",
        "z": "",
        "host": "gw-ip",
        "port": "22",
        "userlabel": "gw-user@gw-ip"
    },
    {
        "id": "d7adbe37.624be",
        "type": "influxdb",
        "z": "",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "gateway",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
