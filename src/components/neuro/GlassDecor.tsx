import glassRibbon from '../../assets/glass-ribbon.png';
import glassShape from '../../assets/glass-shape.png';

export function GlassDecor() {
  return (
    <div className="glass-decor" aria-hidden="true">
      <img className="glass-item glass-item-one" src={glassShape} alt="" />
      <img className="glass-item glass-item-two" src={glassRibbon} alt="" />
      <img className="glass-item glass-item-three" src={glassRibbon} alt="" />
      <img className="glass-item glass-item-four" src={glassShape} alt="" />
    </div>
  );
}
