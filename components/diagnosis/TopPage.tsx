import { WaterSphereExperience } from "./WaterSphereExperience";

export function TopPage() {
  return (
    <>
      <div className="hidden lg:block">
        <WaterSphereExperience />
      </div>
      <div className="lg:hidden">
        <WaterSphereExperience mobileLayout />
      </div>
    </>
  );
}
