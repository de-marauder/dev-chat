import Posts from './Posts'

import classes from '../../styles/Community/index.module.scss'

function Community() {
    return (
    <div className={classes.community}>
        <h1 className={classes.community_header}>Community feed</h1>
        <Posts />
    </div>
    )
}

export default Community;