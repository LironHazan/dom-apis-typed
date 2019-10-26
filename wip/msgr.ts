
type Payload = {msg: string, data: {[key: string]: any}};


export class Messenger {

    static baseClass() {
        return class {

            private _messages: Payload[] = [];

            emit(msg: string, data: {[key: string]: any}){
                this._messages.push({msg, data});
            }

            on(name: string, callback: () => void) {
                if(this._messages.filter(({msg}) => msg === name)) {
                    callback();
                }
            }

        }
    }
};
