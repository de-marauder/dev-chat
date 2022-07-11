import React from "react";
// import { useSession } from "next-auth/react";


export default function ChatItem(props: {
    from: string,
    to: string,
    message: string,
    created_at: string,
    loggedUser: { email?: string | null | undefined; name?: string | null | undefined; image?: string | null | undefined; } | undefined
}) {
    // const { data: session } = useSession();
    return (
        <div style={{ justifyContent: props.from === props.loggedUser?.email ? 'end' : undefined, display: 'flex' }}>
            <li style={{ textAlign: props.from === props.loggedUser?.email ? 'right' : undefined, listStyle: 'none', width: 'fit-content', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem', background: '#888' }}>
                <h4 style={{ fontSize: '.8rem', textAlign: 'left' }}>{props.from.split('@')[0]}</h4>
                <p style={{ margin: '.5rem 0' }}>
                    {props.message}
                </p>

                <span style={{ fontSize: '.8rem' }}>{props.created_at.split('.')[0].split('T').join(' ')}</span>

            </li>
        </div>
    )
}