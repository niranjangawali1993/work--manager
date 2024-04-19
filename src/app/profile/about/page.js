async function takeTime() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

const about = async () => {
  await takeTime();
  throw new Error('New error occurred....');
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
};

export default about;
