module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function sendReceiveNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento;
        this.message_send = config.message_send;
        this.port_send = config.port_send;
        this.port_receive = config.port_receive;
        this.timeout = config.timeout;
        this.compare_select = config.compare_select;
        this.equalTo = config.equalTo;
        this.different = config.different;
        this.flag = config.flag;
        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            console.log(mapeamentoNode)
            var _compare = {};

            if (node.compare_select == "equal") {
                _compare = {
                    message_received: {"==": node.equalTo}
                }
            }
            if (node.compare_select == "different") {
                _compare = {
                    message_received: {"!=": node.different}
                }
            }
            console.log(_compare)
            var globalContext = node.context().global;
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "communication_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "send_receive",
                port_send: node.port_send,
                port_receive: node.port_receive,
                timeout: parseInt(node.timeout),
                message_send: node.message_send,
                compare: _compare,
                exit_timeout:{"==": false},
                get_output: node.flag ? {message_in: "message_received"} : {},
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("send-receive", sendReceiveNode);

    // RED.httpAdmin.get("/getMapeamentoSenReceive",function(req,res) {
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label:"RS232_DB9 -"+ mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label:"RS232_RJ11 -"+ mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label:"RS485 -"+ mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label:"UART_COM -"+ mapeamentoNode.labelPort4, hasValue:false},
    //             {value:mapeamentoNode.valuePort5, label:"UART_1 -"+ mapeamentoNode.labelPort5, hasValue:false},
    //             {value:mapeamentoNode.valuePort6, label:"UART_2 -"+ mapeamentoNode.labelPort6, hasValue:false},
    //             {value:mapeamentoNode.valuePort7, label:"UART_3 -"+ mapeamentoNode.labelPort7, hasValue:false},
    //             {value:mapeamentoNode.valuePort8, label:"UART_4 -"+ mapeamentoNode.labelPort8, hasValue:false},
    //             {value:mapeamentoNode.valuePort9, label:"I2C -"+ mapeamentoNode.labelPort9, hasValue:false},
    //             {value:mapeamentoNode.valuePort10, label:"SPI -"+ mapeamentoNode.labelPort10, hasValue:false},
    //         ])
    //     }
    //     else{
    //         res.json([
    //             {value:"RS232_1", label:"RS232_DB9 -", hasValue:false},
    //             {value:"RS232_2", label:"RS232_RJ11 -", hasValue:false},
    //             {value:"RS485", label:"RS485 -", hasValue:false},
    //             {value:"UART_COM", label:"UART_COM -", hasValue:false},
    //             {value:"UART_1", label:"UART_1 -", hasValue:false},
    //             {value:"UART_2", label:"UART_2 -", hasValue:false},
    //             {value:"UART_3", label:"UART_3 -", hasValue:false},
    //             {value:"UART_4", label:"UART_4 -", hasValue:false},
    //             {value:"I2C", label:"I2C -", hasValue:false},
    //             {value:"SPI", label:"SPI -", hasValue:false},
    //         ])
    //     }
    // });
}