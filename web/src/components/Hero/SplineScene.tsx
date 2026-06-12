"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./SplineScene.module.css";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplinePlaceholder loading />,
});

function SplinePlaceholder({ loading = false }: { loading?: boolean }) {
  return (
    <div
      className={styles.placeholder}
      role="img"
      aria-label="3D scéna Customer Journey — načítá se"
    >
      <div className={styles.placeholderGrid} aria-hidden />
      <p className={styles.placeholderLabel}>
        {loading ? "Načítám 3D scénu…" : "Spline 3D"}
      </p>
      {!loading && (
        <p className={styles.placeholderHint}>
          Nastav{" "}
          <code>NEXT_PUBLIC_SPLINE_SCENE_URL</code> v <code>.env.local</code>
        </p>
      )}
    </div>
  );
}

type SplineSceneProps = {
  sceneUrl: string | undefined;
  onReady?: () => void;
};

export function SplineScene({ sceneUrl, onReady }: SplineSceneProps) {
  const [ready, setReady] = useState(false);

  if (!sceneUrl) {
    return <SplinePlaceholder />;
  }

  const handleLoad = () => {
    setReady(true);
    onReady?.();
  };

  return (
    <div className={styles.wrap} data-ready={ready || undefined}>
      {!ready && <SplinePlaceholder loading />}
      <Spline
        scene={sceneUrl}
        className={styles.canvas}
        onLoad={handleLoad}
      />
    </div>
  );
}
