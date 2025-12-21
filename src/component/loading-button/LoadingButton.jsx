const LoadingButton = ({ text = "Submitting...", loading,loadingText ="Wait" }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn btn-primary font-semibold w-full flex items-center justify-center gap-2"
    >
      {loading ? loadingText : text}
      {loading && <span className="loading loading-spinner loading-xs"></span>}
    </button>
  );
};

export default LoadingButton;



