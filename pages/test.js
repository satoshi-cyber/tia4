const Test = () => {
  return (
    <div id="root">
      <div data-mg-theme="light">
        <div>
          <div
            style={{ justifyContent: 'space-between', flexDirection: 'column' }}
          >
            <div>
              <div style={{ justifyContent: 'center', flexShrink: 0 }}>
                <div>
                  <div
                    className="mg_fj mg_fl"
                    aria-live="assertive"
                    style={{ alignItems: 'center', flexDirection: 'column' }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '10vh',
                      }}
                    />
                    <div className="_a">
                      <span
                        className="mg_fx mg_fy _b"
                        aria-hidden="true"
                        aria-label="Loading"
                      >
                        <svg
                          width={64}
                          height={64}
                          viewBox="0 0 64 64"
                          fill="none"
                          stroke="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx={32}
                            cy={32}
                            r={29}
                            strokeDasharray="201.06192982974676"
                            strokeDashoffset="92.4247719318987"
                            strokeWidth={6}
                            strokeLinecap="round"
                            stroke="#9E51EC"
                            strokeOpacity={1}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
