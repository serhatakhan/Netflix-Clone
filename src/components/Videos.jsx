const Videos = ({ video }) => {
  console.log(video);

  return (
    <div>
      <iframe
        width="800px"
        height="460px"
        src={`https://www.youtube.com/embed/${video.key}`}
      ></iframe>
    </div>
  );
};

export default Videos;
