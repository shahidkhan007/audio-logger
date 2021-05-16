export default function AudioPlayer(props) {
    return (
        <video controls name="media" {...props}>
            <source src="http://localhost:3000/sample.mp3" type="audio/mpeg" />
        </video>
    )
}