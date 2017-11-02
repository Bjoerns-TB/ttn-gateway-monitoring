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
        "x": 281,
        "y": 160.5,
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
        "x": 99,
        "y": 161,
        "wires": [
            [
                "5b9f94a3.ec76ec"
            ]
        ]
    },
    {
        "id": "18c25fbe.638a4",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "var msg1 = {};\nvar msg2 = {};\nvar msg3 = {};\nvar msg4 = {};\nvar msg5 = {};\nmsg.payload = msg.payload.split(\"rxpk\");\nmsg1.payload = msg.payload[1];\nmsg1.payload = msg1.payload.split(\",\\\"data\");\nmsg2.payload = msg1.payload[0];\nmsg2.payload = msg2.payload.substring(2);\n//msg2.payload = msg2.payload.substring(0, msg2.payload.length()-2);\nmsg2.payload = msg2.payload + \"}]\";\n\nmsg3.payload = msg.payload[2];\nmsg3.payload = msg3.payload.split(\",\\\"data\");\nmsg4.payload = msg3.payload[0];\nmsg4.payload = msg4.payload.substring(2);\nmsg4.payload = msg4.payload + \"}]\";\n\nreturn [msg2,msg4];\n",
        "outputs": "3",
        "noerr": 0,
        "x": 582,
        "y": 165,
        "wires": [
            [
                "5d2d0d64.8d70b4"
            ],
            [
                "60d0a615.20d698"
            ],
            []
        ]
    },
    {
        "id": "5d2d0d64.8d70b4",
        "type": "json",
        "z": "7204abf1.ff7124",
        "name": "",
        "x": 720,
        "y": 147,
        "wires": [
            [
                "9de7c81.b4c0a38"
            ]
        ]
    },
    {
        "id": "9de7c81.b4c0a38",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "//rssi\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload[0].rssi;\n\n//snr\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload[0].lsnr;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = msg5.payload[1];\n\n//chan\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload[0].chan;\n\nvar msg6 = {};\nmsg6.payload = [{\"rssi\": msg1.payload, \"snr\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 842,
        "y": 147,
        "wires": [
            [
                "6ccec87a.a96168"
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
        "x": 1034,
        "y": 147,
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
                "v": "rxpk",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 454,
        "y": 162,
        "wires": [
            [
                "18c25fbe.638a4"
            ]
        ]
    },
    {
        "id": "60d0a615.20d698",
        "type": "json",
        "z": "7204abf1.ff7124",
        "name": "",
        "x": 739,
        "y": 189,
        "wires": [
            [
                "81a94c3.54d64b"
            ]
        ]
    },
    {
        "id": "81a94c3.54d64b",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "//rssi\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload[0].rssi;\n\n//snr\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload[0].lsnr;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = msg5.payload[1];\n\n//chan\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload[0].chan;\n\nvar msg6 = {};\nmsg6.payload = [{\"rssi\": msg1.payload, \"snr\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 866,
        "y": 189,
        "wires": [
            [
                "6c75c387.91ff1c"
            ]
        ]
    },
    {
        "id": "6c75c387.91ff1c",
        "type": "influxdb out",
        "z": "7204abf1.ff7124",
        "influxdb": "d7adbe37.624be",
        "name": "",
        "measurement": "gw1",
        "precision": "",
        "retentionPolicy": "",
        "x": 1058,
        "y": 189,
        "wires": []
    },
    {
        "id": "ac5e64fd.682818",
        "type": "SSH_Credentials",
        "z": "",
        "host": "gwip",
        "port": "22",
        "userlabel": "gwuser@gwip"
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
