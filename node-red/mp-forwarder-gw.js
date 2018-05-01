[
    {
        "id": "8d6ca805.a43228",
        "type": "udp in",
        "z": "fe6f12a2.7baa7",
        "name": "",
        "iface": "",
        "port": "1701",
        "ipv": "udp4",
        "multicast": "false",
        "group": "",
        "datatype": "utf8",
        "x": 80,
        "y": 40,
        "wires": [
            [
                "2f9c6ee3.98ff42"
            ]
        ]
    },
    {
        "id": "2f9c6ee3.98ff42",
        "type": "switch",
        "z": "fe6f12a2.7baa7",
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
        "repair": false,
        "outputs": 1,
        "x": 210,
        "y": 40,
        "wires": [
            [
                "ac4dbff5.20bb4"
            ]
        ]
    },
    {
        "id": "ac4dbff5.20bb4",
        "type": "function",
        "z": "fe6f12a2.7baa7",
        "name": "rxpk Count",
        "func": "//count for rxpk messages\nvar msgcount = {};\nmsgcount.payload = msg.payload.split(\"rxpk\").length - 1;\n\n//split these messages\nmsg.payload = msg.payload.split(\"rxpk\");\n\nvar msglist = [];\n\n//\nfor(var i=1; i<msgcount.payload+1; i++)\n{\nmsglist.push({payload:msg.payload[i]});\n}\n\nreturn [msglist];",
        "outputs": 1,
        "noerr": 0,
        "x": 350,
        "y": 40,
        "wires": [
            [
                "d1ce0d34.5b1b2"
            ]
        ]
    },
    {
        "id": "d1ce0d34.5b1b2",
        "type": "function",
        "z": "fe6f12a2.7baa7",
        "name": "",
        "func": "var msg1 = {};\n\nmsg.payload = msg.payload.split(\",\\\"data\");\nmsg1.payload = msg.payload[0];\nmsg1.payload = msg1.payload.substring(2);\nmsg1.payload = msg1.payload + \"}]\";\n\nreturn msg1;",
        "outputs": 1,
        "noerr": 0,
        "x": 490,
        "y": 40,
        "wires": [
            [
                "a48f4aff.eeeb58"
            ]
        ]
    },
    {
        "id": "a48f4aff.eeeb58",
        "type": "json",
        "z": "fe6f12a2.7baa7",
        "name": "",
        "x": 610,
        "y": 40,
        "wires": [
            [
                "27f31f20.ac885"
            ]
        ]
    },
    {
        "id": "27f31f20.ac885",
        "type": "function",
        "z": "fe6f12a2.7baa7",
        "name": "",
        "func": "//rssi\nvar msg1 = { payload: msg.payload.length };\nmsg1.payload = msg.payload[0].rssi;\n\n//snr\nvar msg2 = { payload: msg.payload.length };\nmsg2.payload = msg.payload[0].lsnr;\n\n//freq\nvar msg3 = { payload: msg.payload.length };\nmsg3.payload = msg.payload[0].freq;\n\n//size\nvar msg4 = { payload: msg.payload.length };\nmsg4.payload = msg.payload[0].size;\n\n//SF\nvar msg5 = { payload: msg.payload.length };\nmsg5.payload = msg.payload[0].datr;\nmsg5.payload = msg5.payload.split(\"BW\");\nmsg5.payload = msg5.payload[0];\nmsg5.payload = msg5.payload.split(\"SF\");\nmsg5.payload = parseInt(msg5.payload[1]);\n\n//chan\nvar msg7 = { payload: msg.payload.length };\nmsg7.payload = msg.payload[0].chan;\n\nvar msg6 = {};\nmsg6.payload = [{\"rssi\": msg1.payload, \"snr\": msg2.payload, \"freq\": msg3.payload, \"size\": msg4.payload, \"sf\": msg5.payload, \"chan\": msg7.payload}];\n\nreturn msg6;",
        "outputs": "1",
        "noerr": 0,
        "x": 730,
        "y": 40,
        "wires": [
            [
                "ceaa0f41.192ed"
            ]
        ]
    },
    {
        "id": "ceaa0f41.192ed",
        "type": "influxdb out",
        "z": "fe6f12a2.7baa7",
        "influxdb": "1d630201.40c44e",
        "name": "",
        "measurement": "cologne01",
        "precision": "",
        "retentionPolicy": "",
        "x": 970,
        "y": 40,
        "wires": []
    },
    {
        "id": "1d630201.40c44e",
        "type": "influxdb",
        "z": "",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "gateways",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
