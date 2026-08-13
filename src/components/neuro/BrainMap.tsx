import brainScan from '../../assets/brain-scan.png';
import type { BrainState, BrainZone } from '../../lib/brainLogic';

const zones: Array<{ id: BrainZone; className: string }> = [
  { id: 'pfc', className: 'brain-spot-pfc' },
  { id: 'limbic', className: 'brain-spot-limbic' },
  { id: 'hippocampus', className: 'brain-spot-hippocampus' },
  { id: 'amygdala', className: 'brain-spot-amygdala' },
];

type Props = {
  state: BrainState;
};

export function BrainMap({ state }: Props) {
  return (
    <div className="brain-map-wrap" aria-label="2D модель мозга" role="img">
      <img className="brain-scan-image" src={brainScan} alt="" />
      {zones.map((zone) => {
        const zoneState = state.zones[zone.id];
        return (
          <span
            className={zoneState.damage >= 70 ? `brain-spot ${zone.className} critical` : `brain-spot ${zone.className}`}
            key={zone.id}
            style={{ background: zoneState.color }}
            title={`${zoneState.label}: ${zoneState.status}, урон ${zoneState.damage}%`}
          />
        );
      })}
    </div>
  );
}
