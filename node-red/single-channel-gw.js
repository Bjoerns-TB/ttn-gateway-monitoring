[
    {
        "id": "47ec7295.aa8ebc",
        "type": "tcp in",
        "z": "7204abf1.ff7124",
        "name": "",
        "server": "client",
        "host": "your GW IP",
        "port": "23",
        "datamode": "stream",
        "datatype": "utf8",
        "newline": "",
        "topic": "",
        "base64": false,
        "x": 106.5,
        "y": 23,
        "wires": [
            [
                "d28c9cef.dbfba"
            ]
        ]
    },
    {
        "id": "d28c9cef.dbfba",
        "type": "switch",
        "z": "7204abf1.ff7124",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "message",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 291,
        "y": 23,
        "wires": [
            [
                "4e0d97b6.841e68"
            ]
        ]
    },
    {
        "id": "4e0d97b6.841e68",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "var msg1 = {};\nvar msg2 = {};\nmsg.payload = msg.payload.split(\"message\");\nmsg1.payload = msg.payload[1];\nmsg1.payload = msg1.payload.split(\"length\");\nmsg2.payload = msg1.payload[0];\nreturn msg2;",
        "outputs": 1,
        "noerr": 0,
        "x": 441.5,
        "y": 25,
        "wires": [
            [
                "a2155487.ed9c28"
            ]
        ]
    },
    {
        "id": "a2155487.ed9c28",
        "type": "json",
        "z": "7204abf1.ff7124",
        "name": "",
        "x": 558.5,
        "y": 25,
        "wires": [
            [
                "a8f80737.6a73d8"
            ]
        ]
    },
    {
        "id": "a8f80737.6a73d8",
        "type": "function",
        "z": "7204abf1.ff7124",
        "name": "",
        "func": "//rssi\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload.rxpk[0].rssi;\n\n//snr\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload.rxpk[0].lsnr;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload.rxpk[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload.rxpk[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload.rxpk[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = msg5.payload[1];\n\n//size\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload.rxpk[0].chan;\n\nvar msg6 = {};\nmsg6.payload = [{\"rssi\": msg1.payload, \"snr\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 679.5,
        "y": 25,
        "wires": [
            [
                "e04dadbe.cdff7"
            ]
        ]
    },
    {
        "id": "e04dadbe.cdff7",
        "type": "influxdb out",
        "z": "7204abf1.ff7124",
        "influxdb": "d7adbe37.624be",
        "name": "",
        "measurement": "gw0",
        "precision": "",
        "retentionPolicy": "",
        "x": 871.5,
        "y": 26,
        "wires": []
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
