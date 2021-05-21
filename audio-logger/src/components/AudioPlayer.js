export default function AudioPlayer(props) {
    return (
        <audio controls name="media" {...props}>
            <source src={props.src} type="audio/wav" />
        </audio>
    )
}