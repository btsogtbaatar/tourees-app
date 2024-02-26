import reactotron from 'reactotron-react-native';

export function configure(options: any = {}) {
  configReactotron();
  connectConsoleReactotron();
}

function configReactotron() {
  reactotron.useReactNative();
  reactotron.connect();
  reactotron.clear && reactotron.clear();
}

function connectConsoleReactotron() {
  console.info = info;
}

function info(message: string, ...args: any[]) {
  reactotron.display({
    name: 'INFO',
    preview: message,
    value: { message, args },
  });
}
