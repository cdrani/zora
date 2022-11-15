import { observable } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'

export interface Command<Params = any> {
    execute(params?: Params): Promise<void> | void;
    canExecute(params?: Params): boolean;
}

export const Invoker = <Params = any>(
    command: Command<Params>,
    params?: Params,
) => {
    if (command.canExecute(params)) {
        command.execute(params);
    }
};

// hook for use in containers/view to consume command
export const useCommand = <T extends Command>(command: () => T) => {
    const store = useLocalObservable(() => observable.box(command()));
    return store.get();
};