module.exports = function(RED) {

    // "use strict";
    var mapeamentoNode;

    function multipleSendReceive(self, file, slot, currentMode){
        for(var t=0; t<self.qtdSendReceive; t++){
            var _compare_n = {};

            if (self.compare_select_n[t] == "equal") {
                _compare_n = {
                    message_received: {"==": self.equalTo_n[t]}
                };
            }
            if (self.compare_select_n[t] == "different") {
                _compare_n = {
                    message_received: {"!=": self.different_n[t]}
                };
            }
            var command_n={
                type: "communication_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "send_receive",
                port_send: self.port_send_n[t],
                port_receive: self.port_receive_n[t],
                timeout: parseInt(self.timeout_n[t]),
                message_send: self.message_send_n[t],
                compare: _compare_n,
                exit_timeout:{"==": false},
                get_output: self.flag_n[t] ? {message_in: "message_received"} : {},
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

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

        this.qtdSendReceive = config.qtdSendReceive;
        this.message_send_n = []; this.port_send_n = []; this.port_receive_n = []; this.timeout_n = []; this.compare_select_n = []; this.equalTo_n = []; this.different_n = []; this.flag_n = [];
        this.message_send_n.push(config.message_send1); this.port_send_n.push(config.port_send1); this.port_receive_n.push(config.port_receive1); this.timeout_n.push(config.timeout1); this.compare_select_n.push(config.compare_select1); this.equalTo_n.push(config.equalTo1); this.different_n.push(config.different1); this.flag_n.push(config.flag1);
        this.message_send_n.push(config.message_send2); this.port_send_n.push(config.port_send2); this.port_receive_n.push(config.port_receive2); this.timeout_n.push(config.timeout2); this.compare_select_n.push(config.compare_select2); this.equalTo_n.push(config.equalTo2); this.different_n.push(config.different2); this.flag_n.push(config.flag2);
        this.message_send_n.push(config.message_send3); this.port_send_n.push(config.port_send3); this.port_receive_n.push(config.port_receive3); this.timeout_n.push(config.timeout3); this.compare_select_n.push(config.compare_select3); this.equalTo_n.push(config.equalTo3); this.different_n.push(config.different3); this.flag_n.push(config.flag3);
        this.message_send_n.push(config.message_send4); this.port_send_n.push(config.port_send4); this.port_receive_n.push(config.port_receive4); this.timeout_n.push(config.timeout4); this.compare_select_n.push(config.compare_select4); this.equalTo_n.push(config.equalTo4); this.different_n.push(config.different4); this.flag_n.push(config.flag4);
        this.message_send_n.push(config.message_send5); this.port_send_n.push(config.port_send5); this.port_receive_n.push(config.port_receive5); this.timeout_n.push(config.timeout5); this.compare_select_n.push(config.compare_select5); this.equalTo_n.push(config.equalTo5); this.different_n.push(config.different5); this.flag_n.push(config.flag5);
        this.message_send_n.push(config.message_send6); this.port_send_n.push(config.port_send6); this.port_receive_n.push(config.port_receive6); this.timeout_n.push(config.timeout6); this.compare_select_n.push(config.compare_select6); this.equalTo_n.push(config.equalTo6); this.different_n.push(config.different6); this.flag_n.push(config.flag6);
        this.message_send_n.push(config.message_send7); this.port_send_n.push(config.port_send7); this.port_receive_n.push(config.port_receive7); this.timeout_n.push(config.timeout7); this.compare_select_n.push(config.compare_select7); this.equalTo_n.push(config.equalTo7); this.different_n.push(config.different7); this.flag_n.push(config.flag7);
        this.message_send_n.push(config.message_send8); this.port_send_n.push(config.port_send8); this.port_receive_n.push(config.port_receive8); this.timeout_n.push(config.timeout8); this.compare_select_n.push(config.compare_select8); this.equalTo_n.push(config.equalTo8); this.different_n.push(config.different8); this.flag_n.push(config.flag8);
        this.message_send_n.push(config.message_send9); this.port_send_n.push(config.port_send9); this.port_receive_n.push(config.port_receive9); this.timeout_n.push(config.timeout9); this.compare_select_n.push(config.compare_select9); this.equalTo_n.push(config.equalTo9); this.different_n.push(config.different9); this.flag_n.push(config.flag9);
        this.message_send_n.push(config.message_send10); this.port_send_n.push(config.port_send10); this.port_receive_n.push(config.port_receive10); this.timeout_n.push(config.timeout10); this.compare_select_n.push(config.compare_select10); this.equalTo_n.push(config.equalTo10); this.different_n.push(config.different10); this.flag_n.push(config.flag10);
        this.message_send_n.push(config.message_send11); this.port_send_n.push(config.port_send11); this.port_receive_n.push(config.port_receive11); this.timeout_n.push(config.timeout11); this.compare_select_n.push(config.compare_select11); this.equalTo_n.push(config.equalTo11); this.different_n.push(config.different11); this.flag_n.push(config.flag11);
        this.message_send_n.push(config.message_send12); this.port_send_n.push(config.port_send12); this.port_receive_n.push(config.port_receive12); this.timeout_n.push(config.timeout12); this.compare_select_n.push(config.compare_select12); this.equalTo_n.push(config.equalTo12); this.different_n.push(config.different12); this.flag_n.push(config.flag12);
        this.message_send_n.push(config.message_send13); this.port_send_n.push(config.port_send13); this.port_receive_n.push(config.port_receive13); this.timeout_n.push(config.timeout13); this.compare_select_n.push(config.compare_select13); this.equalTo_n.push(config.equalTo13); this.different_n.push(config.different13); this.flag_n.push(config.flag13);
        this.message_send_n.push(config.message_send14); this.port_send_n.push(config.port_send14); this.port_receive_n.push(config.port_receive14); this.timeout_n.push(config.timeout14); this.compare_select_n.push(config.compare_select14); this.equalTo_n.push(config.equalTo14); this.different_n.push(config.different14); this.flag_n.push(config.flag14);
        this.message_send_n.push(config.message_send15); this.port_send_n.push(config.port_send15); this.port_receive_n.push(config.port_receive15); this.timeout_n.push(config.timeout15); this.compare_select_n.push(config.compare_select15); this.equalTo_n.push(config.equalTo15); this.different_n.push(config.different15); this.flag_n.push(config.flag15);
        this.message_send_n.push(config.message_send16); this.port_send_n.push(config.port_send16); this.port_receive_n.push(config.port_receive16); this.timeout_n.push(config.timeout16); this.compare_select_n.push(config.compare_select16); this.equalTo_n.push(config.equalTo16); this.different_n.push(config.different16); this.flag_n.push(config.flag16);
        this.message_send_n.push(config.message_send17); this.port_send_n.push(config.port_send17); this.port_receive_n.push(config.port_receive17); this.timeout_n.push(config.timeout17); this.compare_select_n.push(config.compare_select17); this.equalTo_n.push(config.equalTo17); this.different_n.push(config.different17); this.flag_n.push(config.flag17);
        this.message_send_n.push(config.message_send18); this.port_send_n.push(config.port_send18); this.port_receive_n.push(config.port_receive18); this.timeout_n.push(config.timeout18); this.compare_select_n.push(config.compare_select18); this.equalTo_n.push(config.equalTo18); this.different_n.push(config.different18); this.flag_n.push(config.flag18);
        this.message_send_n.push(config.message_send19); this.port_send_n.push(config.port_send19); this.port_receive_n.push(config.port_receive19); this.timeout_n.push(config.timeout19); this.compare_select_n.push(config.compare_select19); this.equalTo_n.push(config.equalTo19); this.different_n.push(config.different19); this.flag_n.push(config.flag19);
        this.message_send_n.push(config.message_send20); this.port_send_n.push(config.port_send20); this.port_receive_n.push(config.port_receive20); this.timeout_n.push(config.timeout20); this.compare_select_n.push(config.compare_select20); this.equalTo_n.push(config.equalTo20); this.different_n.push(config.different20); this.flag_n.push(config.flag20);
        this.message_send_n.push(config.message_send21); this.port_send_n.push(config.port_send21); this.port_receive_n.push(config.port_receive21); this.timeout_n.push(config.timeout21); this.compare_select_n.push(config.compare_select21); this.equalTo_n.push(config.equalTo21); this.different_n.push(config.different21); this.flag_n.push(config.flag21);
        this.message_send_n.push(config.message_send22); this.port_send_n.push(config.port_send22); this.port_receive_n.push(config.port_receive22); this.timeout_n.push(config.timeout22); this.compare_select_n.push(config.compare_select22); this.equalTo_n.push(config.equalTo22); this.different_n.push(config.different22); this.flag_n.push(config.flag22);
        this.message_send_n.push(config.message_send23); this.port_send_n.push(config.port_send23); this.port_receive_n.push(config.port_receive23); this.timeout_n.push(config.timeout23); this.compare_select_n.push(config.compare_select23); this.equalTo_n.push(config.equalTo23); this.different_n.push(config.different23); this.flag_n.push(config.flag23);
        this.message_send_n.push(config.message_send24); this.port_send_n.push(config.port_send24); this.port_receive_n.push(config.port_receive24); this.timeout_n.push(config.timeout24); this.compare_select_n.push(config.compare_select24); this.equalTo_n.push(config.equalTo24); this.different_n.push(config.different24); this.flag_n.push(config.flag24);
        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            // console.log(mapeamentoNode)
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
            // console.log(_compare)
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
                    file =  multipleSendReceive(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file =  multipleSendReceive(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file =  multipleSendReceive(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file =  multipleSendReceive(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("send-receive", sendReceiveNode);
}