import neuroHead from '../../assets/neuro-head.png';

export function FaceSilhouette() {
  return (
    <div className="face-stage" aria-hidden="true">
      <img className="face-image" src={neuroHead} alt="" />
    </div>
  );
}
