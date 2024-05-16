import React  from 'react';
import { useFlags, useFlagsmith } from 'flagsmith/react';

function App() {
    const flags = useFlags(['is_user_a'], ['name']); // only causes re-render if specified flag values / traits change
    const flagsmith = useFlagsmith();
    const identify = (name: string) => async () => {
        await flagsmith.identify(name, {});
    };
    return (
        <div className='App'>
            <div>identity: {flagsmith.identity}</div>
            <div>is_user_a: {JSON.stringify(flags, null, 2)}</div>
            <div>name: {JSON.stringify(flagsmith.getState().traits.name, null, 2)}</div>
            <button onClick={identify('A')}>
                Identify (A)
            </button>
            <button onClick={identify('B')}>
                Identify (B)
            </button>
            <button onClick={identify((new Date()).toString())}>
                Identify (current datetime)
            </button>
            <button onClick={() => flagsmith.logout()}>
                Logout
            </button>
        </div>
    );
}

export default App;
