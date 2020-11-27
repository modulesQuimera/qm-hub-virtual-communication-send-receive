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
            if (self.compare_select_n[t] == "substr") {
                _compare_n = {
                    message_received: {"in": self.substr_n[t]}
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
            }
            var extract_command_n = {
                type: "processing_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "save_values",
                message_ref: self.extract_info_n[t],
                message: "",
                compare: { status:{ "==": true } },
                get_output: {"message": "message_received"}
            }

            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                    if(self.extract_flag_n[t]) file.slots[slot].jig_test.push(extract_command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                    if(self.extract_flag_n[t]) file.slots[slot].jig_error.push(extract_command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                    if(self.extract_flag_n[t]) file.slots[0].jig_test.push(extract_command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                    if(self.extract_flag_n[t]) file.slots[3].jig_test.push(extract_command_n);
                }
            }
        }
    }

    function sendReceiveNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento;
        this.message_send = config.message_send;
        this.port_send = config.port_send_N[0];
        this.port_receive = config.port_receive_N[0];
        this.timeout = config.timeout;
        this.compare_select = config.compare_select;
        this.equalTo = config.equalTo;
        this.substr = config.substr;
        this.different = config.different;
        this.extract_flag = config.extract_flag;
        this.extract_info = config.extract_info;

        this.qtdSendReceive = config.qtdSendReceive;
        this.message_send_n = []; this.port_send_n = []; this.port_receive_n = []; this.timeout_n = []; this.compare_select_n = []; this.equalTo_n = []; this.different_n = []; this.substr_n = []; this.extract_flag_n = []; this.extract_info_n = [];
        this.message_send_n.push(config.message_send1); this.port_send_n.push(config.port_send_N[1]); this.port_receive_n.push(config.port_receive_N[1]); this.timeout_n.push(config.timeout1); this.compare_select_n.push(config.compare_select1); this.equalTo_n.push(config.equalTo1); this.different_n.push(config.different1); this.extract_flag_n.push(config.extract_flag1); this.extract_info_n.push(config.extract_info1); this.substr_n.push(config.substr1);
        this.message_send_n.push(config.message_send2); this.port_send_n.push(config.port_send_N[2]); this.port_receive_n.push(config.port_receive_N[2]); this.timeout_n.push(config.timeout2); this.compare_select_n.push(config.compare_select2); this.equalTo_n.push(config.equalTo2); this.different_n.push(config.different2); this.extract_flag_n.push(config.extract_flag2); this.extract_info_n.push(config.extract_info2); this.substr_n.push(config.substr2);
        this.message_send_n.push(config.message_send3); this.port_send_n.push(config.port_send_N[3]); this.port_receive_n.push(config.port_receive_N[3]); this.timeout_n.push(config.timeout3); this.compare_select_n.push(config.compare_select3); this.equalTo_n.push(config.equalTo3); this.different_n.push(config.different3); this.extract_flag_n.push(config.extract_flag3); this.extract_info_n.push(config.extract_info3); this.substr_n.push(config.substr3);
        this.message_send_n.push(config.message_send4); this.port_send_n.push(config.port_send_N[4]); this.port_receive_n.push(config.port_receive_N[4]); this.timeout_n.push(config.timeout4); this.compare_select_n.push(config.compare_select4); this.equalTo_n.push(config.equalTo4); this.different_n.push(config.different4); this.extract_flag_n.push(config.extract_flag4); this.extract_info_n.push(config.extract_info4); this.substr_n.push(config.substr4);
        this.message_send_n.push(config.message_send5); this.port_send_n.push(config.port_send_N[5]); this.port_receive_n.push(config.port_receive_N[5]); this.timeout_n.push(config.timeout5); this.compare_select_n.push(config.compare_select5); this.equalTo_n.push(config.equalTo5); this.different_n.push(config.different5); this.extract_flag_n.push(config.extract_flag5); this.extract_info_n.push(config.extract_info5); this.substr_n.push(config.substr5);
        this.message_send_n.push(config.message_send6); this.port_send_n.push(config.port_send_N[6]); this.port_receive_n.push(config.port_receive_N[6]); this.timeout_n.push(config.timeout6); this.compare_select_n.push(config.compare_select6); this.equalTo_n.push(config.equalTo6); this.different_n.push(config.different6); this.extract_flag_n.push(config.extract_flag6); this.extract_info_n.push(config.extract_info6); this.substr_n.push(config.substr6);
        this.message_send_n.push(config.message_send7); this.port_send_n.push(config.port_send_N[7]); this.port_receive_n.push(config.port_receive_N[7]); this.timeout_n.push(config.timeout7); this.compare_select_n.push(config.compare_select7); this.equalTo_n.push(config.equalTo7); this.different_n.push(config.different7); this.extract_flag_n.push(config.extract_flag7); this.extract_info_n.push(config.extract_info7); this.substr_n.push(config.substr7);
        this.message_send_n.push(config.message_send8); this.port_send_n.push(config.port_send_N[8]); this.port_receive_n.push(config.port_receive_N[8]); this.timeout_n.push(config.timeout8); this.compare_select_n.push(config.compare_select8); this.equalTo_n.push(config.equalTo8); this.different_n.push(config.different8); this.extract_flag_n.push(config.extract_flag8); this.extract_info_n.push(config.extract_info8); this.substr_n.push(config.substr8);
        this.message_send_n.push(config.message_send9); this.port_send_n.push(config.port_send_N[9]); this.port_receive_n.push(config.port_receive_N[9]); this.timeout_n.push(config.timeout9); this.compare_select_n.push(config.compare_select9); this.equalTo_n.push(config.equalTo9); this.different_n.push(config.different9); this.extract_flag_n.push(config.extract_flag9); this.extract_info_n.push(config.extract_info9); this.substr_n.push(config.substr9);
        this.message_send_n.push(config.message_send10); this.port_send_n.push(config.port_send_N[10]); this.port_receive_n.push(config.port_receive_N[10]); this.timeout_n.push(config.timeout10); this.compare_select_n.push(config.compare_select10); this.equalTo_n.push(config.equalTo10); this.different_n.push(config.different10); this.extract_flag_n.push(config.extract_flag10); this.extract_info_n.push(config.extract_info10); this.substr_n.push(config.substr10);
        this.message_send_n.push(config.message_send11); this.port_send_n.push(config.port_send_N[11]); this.port_receive_n.push(config.port_receive_N[11]); this.timeout_n.push(config.timeout11); this.compare_select_n.push(config.compare_select11); this.equalTo_n.push(config.equalTo11); this.different_n.push(config.different11); this.extract_flag_n.push(config.extract_flag11); this.extract_info_n.push(config.extract_info11); this.substr_n.push(config.substr11);
        this.message_send_n.push(config.message_send12); this.port_send_n.push(config.port_send_N[12]); this.port_receive_n.push(config.port_receive_N[12]); this.timeout_n.push(config.timeout12); this.compare_select_n.push(config.compare_select12); this.equalTo_n.push(config.equalTo12); this.different_n.push(config.different12); this.extract_flag_n.push(config.extract_flag12); this.extract_info_n.push(config.extract_info12); this.substr_n.push(config.substr12);
        this.message_send_n.push(config.message_send13); this.port_send_n.push(config.port_send_N[13]); this.port_receive_n.push(config.port_receive_N[13]); this.timeout_n.push(config.timeout13); this.compare_select_n.push(config.compare_select13); this.equalTo_n.push(config.equalTo13); this.different_n.push(config.different13); this.extract_flag_n.push(config.extract_flag13); this.extract_info_n.push(config.extract_info13); this.substr_n.push(config.substr13);
        this.message_send_n.push(config.message_send14); this.port_send_n.push(config.port_send_N[14]); this.port_receive_n.push(config.port_receive_N[14]); this.timeout_n.push(config.timeout14); this.compare_select_n.push(config.compare_select14); this.equalTo_n.push(config.equalTo14); this.different_n.push(config.different14); this.extract_flag_n.push(config.extract_flag14); this.extract_info_n.push(config.extract_info14); this.substr_n.push(config.substr14);
        this.message_send_n.push(config.message_send15); this.port_send_n.push(config.port_send_N[15]); this.port_receive_n.push(config.port_receive_N[15]); this.timeout_n.push(config.timeout15); this.compare_select_n.push(config.compare_select15); this.equalTo_n.push(config.equalTo15); this.different_n.push(config.different15); this.extract_flag_n.push(config.extract_flag15); this.extract_info_n.push(config.extract_info15); this.substr_n.push(config.substr15);
        this.message_send_n.push(config.message_send16); this.port_send_n.push(config.port_send_N[16]); this.port_receive_n.push(config.port_receive_N[16]); this.timeout_n.push(config.timeout16); this.compare_select_n.push(config.compare_select16); this.equalTo_n.push(config.equalTo16); this.different_n.push(config.different16); this.extract_flag_n.push(config.extract_flag16); this.extract_info_n.push(config.extract_info16); this.substr_n.push(config.substr16);
        this.message_send_n.push(config.message_send17); this.port_send_n.push(config.port_send_N[17]); this.port_receive_n.push(config.port_receive_N[17]); this.timeout_n.push(config.timeout17); this.compare_select_n.push(config.compare_select17); this.equalTo_n.push(config.equalTo17); this.different_n.push(config.different17); this.extract_flag_n.push(config.extract_flag17); this.extract_info_n.push(config.extract_info17); this.substr_n.push(config.substr17);
        this.message_send_n.push(config.message_send18); this.port_send_n.push(config.port_send_N[18]); this.port_receive_n.push(config.port_receive_N[18]); this.timeout_n.push(config.timeout18); this.compare_select_n.push(config.compare_select18); this.equalTo_n.push(config.equalTo18); this.different_n.push(config.different18); this.extract_flag_n.push(config.extract_flag18); this.extract_info_n.push(config.extract_info18); this.substr_n.push(config.substr18);
        this.message_send_n.push(config.message_send19); this.port_send_n.push(config.port_send_N[19]); this.port_receive_n.push(config.port_receive_N[19]); this.timeout_n.push(config.timeout19); this.compare_select_n.push(config.compare_select19); this.equalTo_n.push(config.equalTo19); this.different_n.push(config.different19); this.extract_flag_n.push(config.extract_flag19); this.extract_info_n.push(config.extract_info19); this.substr_n.push(config.substr19);
        this.message_send_n.push(config.message_send20); this.port_send_n.push(config.port_send_N[20]); this.port_receive_n.push(config.port_receive_N[20]); this.timeout_n.push(config.timeout20); this.compare_select_n.push(config.compare_select20); this.equalTo_n.push(config.equalTo20); this.different_n.push(config.different20); this.extract_flag_n.push(config.extract_flag20); this.extract_info_n.push(config.extract_info20); this.substr_n.push(config.substr20);
        this.message_send_n.push(config.message_send21); this.port_send_n.push(config.port_send_N[21]); this.port_receive_n.push(config.port_receive_N[21]); this.timeout_n.push(config.timeout21); this.compare_select_n.push(config.compare_select21); this.equalTo_n.push(config.equalTo21); this.different_n.push(config.different21); this.extract_flag_n.push(config.extract_flag21); this.extract_info_n.push(config.extract_info21); this.substr_n.push(config.substr21);
        this.message_send_n.push(config.message_send22); this.port_send_n.push(config.port_send_N[22]); this.port_receive_n.push(config.port_receive_N[22]); this.timeout_n.push(config.timeout22); this.compare_select_n.push(config.compare_select22); this.equalTo_n.push(config.equalTo22); this.different_n.push(config.different22); this.extract_flag_n.push(config.extract_flag22); this.extract_info_n.push(config.extract_info22); this.substr_n.push(config.substr22);
        this.message_send_n.push(config.message_send23); this.port_send_n.push(config.port_send_N[23]); this.port_receive_n.push(config.port_receive_N[23]); this.timeout_n.push(config.timeout23); this.compare_select_n.push(config.compare_select23); this.equalTo_n.push(config.equalTo23); this.different_n.push(config.different23); this.extract_flag_n.push(config.extract_flag23); this.extract_info_n.push(config.extract_info23); this.substr_n.push(config.substr23);
        this.message_send_n.push(config.message_send24); this.port_send_n.push(config.port_send_N[24]); this.port_receive_n.push(config.port_receive_N[24]); this.timeout_n.push(config.timeout24); this.compare_select_n.push(config.compare_select24); this.equalTo_n.push(config.equalTo24); this.different_n.push(config.different24); this.extract_flag_n.push(config.extract_flag24); this.extract_info_n.push(config.extract_info24); this.substr_n.push(config.substr24);
        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {

            var _compare = {};

            if (node.compare_select == "equal") {
                _compare = {
                    message_received: {"==": node.equalTo}
                };
            }
            if (node.compare_select == "different") {
                _compare = {
                    message_received: {"!=": node.different}
                };
            }
            if (node.compare_select == "substr") {
                _compare = {
                    message_received: {"in": node.substr}
                };
            }

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
            }
            var extract_command = {
                type: "processing_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "save_values",
                message_ref: node.extract_info,
                message: "",
                compare: { status:{ "==": true } },
                get_output: {"message": "message_received"}
            }

            var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){                    
                    file.slots[slot].jig_test.push(command);
                    if(node.extract_flag) file.slots[slot].jig_test.push(extract_command);
                    multipleSendReceive(node, file, slot, currentMode);   
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    if(node.extract_flag) file.slots[slot].jig_error.push(extract_command);
                    multipleSendReceive(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    if(node.extract_flag) file.slots[0].jig_test.push(extract_command);
                    multipleSendReceive(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    if(node.extract_flag) file.slots[3].jig_test.push(extract_command);             
                    multipleSendReceive(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            //console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("send-receive", sendReceiveNode);
}