export function FaceSilhouette() {
  return (
    <div className="face-stage" aria-hidden="true">
      <div className="face-halo" />
      <div className="face-profile">
        <div className="face-brow" />
        <div className="face-eye" />
        <div className="face-nose" />
        <div className="face-lips" />
        <div className="face-neck" />
      </div>
      <div className="face-ribbon ribbon-one" />
      <div className="face-ribbon ribbon-two" />
      <div className="face-ribbon ribbon-three" />
    </div>
  );
}
