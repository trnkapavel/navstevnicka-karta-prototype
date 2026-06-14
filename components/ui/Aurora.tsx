export default function Aurora() {
  return (
    <div className="aurora-wrap">
      {/* Světle zelená — les, příroda */}
      <div
        className="aurora-blob aurora-a"
        style={{
          width: 400,
          height: 400,
          top: "-25%",
          left: "-20%",
          background: "rgba(134,239,172,0.45)",
        }}
      />
      {/* Světle modrá — nebe, voda */}
      <div
        className="aurora-blob aurora-b"
        style={{
          width: 320,
          height: 320,
          top: "5%",
          right: "-20%",
          background: "rgba(147,210,255,0.40)",
        }}
      />
      {/* Mentolová — svěžest */}
      <div
        className="aurora-blob aurora-c"
        style={{
          width: 250,
          height: 250,
          bottom: "10%",
          left: "5%",
          background: "rgba(110,231,183,0.30)",
        }}
      />
      {/* Teplá žlutozelená — slunce */}
      <div
        className="aurora-blob aurora-b"
        style={{
          width: 200,
          height: 200,
          bottom: "25%",
          right: "0%",
          background: "rgba(187,247,208,0.50)",
          animationDuration: "20s",
        }}
      />
    </div>
  );
}
