import Posts from './Posts'

import classes from '../../styles/Community/index.module.scss'
import CommunityLayout from './CommunityLayout'

type Props = {
    posts: []
}

function Community(props: Props) {
    return (
    <>
        <h1 className={classes.community_header}>Community feed</h1>
        <Posts {...props}/>
    </>
    )
}

Community.Layout = CommunityLayout

export default Community;
