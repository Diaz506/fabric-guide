/* ============================================
   Architecture Design Playground
   Interactive drag-and-drop canvas for Fabric
   architecture diagrams with SVG export.
   ============================================ */

(function () {
  'use strict';

  // ── Icon Registry ──────────────────────────────────────────────
  // Each icon stores its inner SVG content (paths, defs) at a 20x20 viewBox.
  // We render them scaled up on canvas.

  const ICON_SIZE = 40;       // rendered icon size on canvas
  const COMP_W = 120;         // component box width
  const COMP_H = 72;          // component box height
  const PORT_R = 7;           // port radius (larger for easier clicking)
  const LABEL_OFFSET = 62;    // label y offset from top of component

  const ICONS = {
    // ── Fabric: Data Integration ──
    data_factory: {
      label: 'Data Factory', category: 'fabric', group: 'Data Integration',
      svg: `<path fill="url(#i334246-i3dc949-paint0_linear_64423_1160)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i334246-i3dc949-paint1_radial_64423_1160)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i334246-i3dc949-paint2_linear_64423_1160)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i334246-i3dc949-paint3_linear_64423_1160)" d="M7.89 14.75a.34.34 0 0 1-.337-.39 6.125 6.125 0 0 1 6.056-5.235h.613c.42 0 .726-.25.726-.67l.035-.165v2.918a.83.83 0 0 1-.83.832h-.345a2.91 2.91 0 0 0-2.782 2.06l-.11.355a.42.42 0 0 1-.396.295z"/><path fill="url(#i334246-i3dc949-paint4_linear_64423_1160)" d="M7.89 14.75a.34.34 0 0 1-.337-.39 6.125 6.125 0 0 1 6.056-5.235h.613c.42 0 .726-.25.726-.67l.035-.165v2.918a.83.83 0 0 1-.83.832h-.345a2.91 2.91 0 0 0-2.782 2.06l-.11.355a.42.42 0 0 1-.396.295z"/><path fill="url(#i334246-i3dc949-paint5_linear_64423_1160)" d="M5.417 11.335A.42.42 0 0 1 5 10.917v-2.5c0-.23.187-.417.417-.417h7.485c.23 0 .417.188.417.417v2.5c0 .23-.187.418-.417.418z"/><path fill="url(#i334246-i3dc949-paint6_radial_64423_1160)" d="M5.417 11.335A.42.42 0 0 1 5 10.917v-2.5c0-.23.187-.417.417-.417h7.485c.23 0 .417.188.417.417v2.5c0 .23-.187.418-.417.418z"/><path fill="url(#i334246-i3dc949-paint7_linear_64423_1160)" d="M7.895 4.75a.346.346 0 0 0-.342.395 6.22 6.22 0 0 0 6.153 5.332h.516c.42 0 .759.34.759.76V8.292a.83.83 0 0 0-.831-.832h-.344a2.91 2.91 0 0 1-2.782-2.06l-.11-.355a.42.42 0 0 0-.397-.295z"/><path fill="url(#i334246-i3dc949-paint8_linear_64423_1160)" d="M14.15 7.458h-.344c-.592 0-1.15-.18-1.617-.495v3.325c.486.122.995.19 1.52.19h.516c.419 0 .758.34.758.76V8.293a.83.83 0 0 0-.83-.833z" opacity=".4"/><path fill="url(#i334246-i3dc949-paint9_linear_64423_1160)" d="M7.914 4.75a.346.346 0 0 0-.342.395 6.22 6.22 0 0 0 6.153 5.332h.516c.42 0 .759.34.759.76V8.292a.83.83 0 0 0-.831-.832h-.344a2.91 2.91 0 0 1-2.782-2.06l-.11-.355a.42.42 0 0 0-.397-.295z" opacity=".7"/><defs><linearGradient id="i334246-i3dc949-paint0_linear_64423_1160" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><radialGradient id="i334246-i3dc949-paint1_radial_64423_1160" cx="0" cy="0" r="1" gradientTransform="matrix(8.44444 12.6667 -12.6667 4.75 7.111 6.167)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient><linearGradient id="i334246-i3dc949-paint2_linear_64423_1160" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i334246-i3dc949-paint3_linear_64423_1160" x1="8.137" x2="15.039" y1="15.24" y2="8.351" gradientUnits="userSpaceOnUse"><stop offset=".26" stop-color="#0D7012"/><stop offset="1" stop-color="#085714"/></linearGradient><linearGradient id="i334246-i3dc949-paint4_linear_64423_1160" x1="18.354" x2="5.258" y1="10.278" y2="13.182" gradientUnits="userSpaceOnUse"><stop offset=".04" stop-color="#114A8A"/><stop offset="1" stop-color="#0C59A3" stop-opacity="0"/></linearGradient><linearGradient id="i334246-i3dc949-paint5_linear_64423_1160" x1="-.214" x2="13.062" y1="9.667" y2="9.667" gradientUnits="userSpaceOnUse"><stop stop-color="#107C10"/><stop offset=".96" stop-color="#56B50E"/></linearGradient><radialGradient id="i334246-i3dc949-paint6_radial_64423_1160" cx="0" cy="0" r="1" gradientTransform="matrix(1.40899 -2.11447 -5.38126 -3.60003 11.618 9.125)" gradientUnits="userSpaceOnUse"><stop stop-opacity=".3"/><stop offset="1" stop-opacity="0"/></radialGradient><linearGradient id="i334246-i3dc949-paint7_linear_64423_1160" x1="15.457" x2="8.993" y1="13.165" y2="3.95" gradientUnits="userSpaceOnUse"><stop offset=".04" stop-color="#33980F"/><stop offset="1" stop-color="#BAE884"/></linearGradient><linearGradient id="i334246-i3dc949-paint8_linear_64423_1160" x1="13.449" x2="14.951" y1="9.1" y2="9.1" gradientUnits="userSpaceOnUse"><stop stop-color="#E5FAC1" stop-opacity="0"/><stop offset=".56" stop-color="#E5FAC1" stop-opacity=".52"/><stop offset="1" stop-color="#E5FAC1"/></linearGradient><linearGradient id="i334246-i3dc949-paint9_linear_64423_1160" x1="7.235" x2="11.134" y1=".023" y2="6.758" gradientUnits="userSpaceOnUse"><stop offset=".14" stop-color="#FDE100"/><stop offset=".98" stop-color="#FFC600" stop-opacity="0"/></linearGradient></defs>`
    },
    pipeline: {
      label: 'Pipeline', category: 'fabric', group: 'Data Integration',
      svg: `<path fill="url(#i398577-a)" fill-rule="evenodd" d="M4 5.5a1.5 1.5 0 1 1 3 0V6h6v-.5a1.5 1.5 0 0 1 3 0v3.707a5.5 5.5 0 0 0-1-.185V5.5a.5.5 0 0 0-1 0v3.522a5.5 5.5 0 0 0-1 .185V7H7v5h2.6a5.5 5.5 0 0 0-.393 1H7v.5a1.5 1.5 0 0 1-3 0zm2 0v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 1 0" clip-rule="evenodd"/><path fill="url(#i398577-b)" fill-rule="evenodd" d="M14.5 19a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5" clip-rule="evenodd"/><defs><linearGradient id="i398577-a" x1="4" x2="19" y1="4" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#209782"/><stop offset="1" stop-color="#0C695A"/></linearGradient><linearGradient id="i398577-b" x1="4" x2="19" y1="4" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#209782"/><stop offset="1" stop-color="#0C695A"/></linearGradient></defs>`
    },
    dataflow: {
      label: 'Dataflow Gen2', category: 'fabric', group: 'Data Integration',
      svg: `<path fill="url(#i299907-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i299907-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i299907-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i299907-d)" fill-rule="evenodd" d="M7.5 8.937a2 2 0 1 0-1 0v2.126a2 2 0 1 0 1 0V10.5h4a2 2 0 0 0 1.95-1.55 2 2 0 1 0-1.038-.038 1 1 0 0 1-.912.588h-4zM8 7v.003zm6 .003V7z" clip-rule="evenodd"/><defs><linearGradient id="i299907-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i299907-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i299907-d" x1="5" x2="15" y1="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="i299907-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    copy_job: {
      label: 'Copy Job', category: 'fabric', group: 'Data Integration',
      svg: `<path fill="url(#i0437fa-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i0437fa-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i0437fa-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i0437fa-d)" fill-rule="evenodd" d="M11.5 12.472v-.568a3 3 0 0 1-.173.104c-.582.324-1.318.493-2.077.493s-1.495-.17-2.077-.492A3 3 0 0 1 7 11.903v1.954h.008C7.106 14.498 8.072 15 9.25 15s2.144-.503 2.242-1.143h.008v-.38q.245.022.5.022c.752 0 1.457-.151 1.992-.419.506-.253 1.01-.694 1.01-1.331H15V6.802a1 1 0 0 0 0-.104v-.034h-.002c-.043-.59-.523-1.004-1.006-1.245C13.457 5.15 12.752 5 12.001 5s-1.457.151-1.992.419c-.483.241-.963.654-1.006 1.245H9v1.342Q9.124 8 9.25 8c.723 0 1.425.153 1.993.447q.367.053.758.053c.75 0 1.456-.151 1.991-.419L14 8.077v3.673h.001c0 .054-.056.237-.456.437-.37.184-.915.313-1.544.313q-.262 0-.501-.028m-1.044-6.159c-.4.2-.456.383-.456.437s.057.237.456.437c.37.184.915.313 1.545.313s1.175-.129 1.544-.313c.369-.185.445-.355.455-.422v-.03c-.01-.067-.086-.237-.455-.422C13.175 6.13 12.63 6 12.001 6c-.63 0-1.176.129-1.545.313" clip-rule="evenodd"/><path fill="url(#i0437fa-e)" d="M7 10.25c0-.643.875-1.173 2-1.242a4 4 0 0 1 1 .063c.874.172 1.5.635 1.5 1.18 0 .69-1.007 1.25-2.25 1.25S7 10.94 7 10.25"/><path fill="url(#i0437fa-f)" d="M6.146 5.646a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-1 1a.5.5 0 1 1-.708-.708l.009-.008c-.39.204-.655.612-.655 1.081V9.5a.5.5 0 0 1-1 0v-.78c0-1.093.789-2 1.827-2.186l-.18-.18a.5.5 0 0 1 0-.708Z"/><defs><linearGradient id="i0437fa-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i0437fa-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i0437fa-d" x1="4.5" x2="14.489" y1="5" y2="15.489" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><linearGradient id="i0437fa-e" x1="4.5" x2="14.489" y1="5" y2="15.489" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><linearGradient id="i0437fa-f" x1="4.5" x2="14.489" y1="5" y2="15.489" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="i0437fa-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Data Engineering ──
    lakehouse: {
      label: 'Lakehouse', category: 'fabric', group: 'Data Engineering',
      svg: `<path fill="url(#i21c904-a)" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#i21c904-b)" fill-opacity=".2" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#i21c904-c)" fill-rule="evenodd" d="M15.5 2h-11A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 15.5 2m-11-1A2.5 2.5 0 0 0 2 3.5v13A2.5 2.5 0 0 0 4.5 19h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 15.5 1z" clip-rule="evenodd"/><path fill="url(#i21c904-d)" d="M8.99 14.69a1.5 1.5 0 0 0-.153.31H6.5A1.5 1.5 0 0 1 5 13.5V9.668c0-.425.18-.83.497-1.115l3.5-3.15a1.5 1.5 0 0 1 2.007 0l3.5 3.15A1.5 1.5 0 0 1 15 9.668v.34L14.98 10a1.5 1.5 0 0 0-.94-.01l-.12.05c-.37.15-.66.44-.81.81-.01.02-.05.07-.11.13-.06-.05-.11-.11-.11-.13a1.49 1.49 0 0 0-1.39-.93h-.14c-.57.05-1.05.42-1.26.95-.04.08-.06.13-.06.13a.3.3 0 0 1-.09.031l-.03.009a1.5 1.5 0 0 0-1.13 1.79 1.46 1.46 0 0 0 1.264 1.15l-.004.01a.3.3 0 0 1-.09.031l-.03.009c-.39.09-.73.32-.94.66"/><path fill="url(#i21c904-e)" d="M14.347 10.935a.5.5 0 0 0-.31.287c-.071.176-.22.379-.422.536-.2.157-.418.242-.622.242s-.417-.085-.613-.24a1.4 1.4 0 0 1-.417-.537.5.5 0 0 0-.929.007c-.103.265-.218.426-.343.533s-.294.191-.55.25a.5.5 0 1 0 .219.975c.369-.083.7-.224.982-.466q.1-.087.188-.185.107.111.23.207c.325.258.751.456 1.233.456.48 0 .909-.197 1.238-.453a3 3 0 0 0 .238-.213q.087.1.19.188c.28.242.613.383.982.466a.5.5 0 1 0 .22-.976c-.257-.058-.426-.141-.551-.249-.126-.107-.24-.268-.344-.533a.5.5 0 0 0-.277-.282h-.002a.5.5 0 0 0-.34-.013"/><path fill="url(#i21c904-f)" d="M11.342 15.522q.1-.087.188-.185.107.111.23.207c.325.258.751.456 1.233.456.48 0 .909-.197 1.238-.453q.126-.1.238-.212.087.1.19.187c.28.242.613.383.982.466a.5.5 0 1 0 .22-.976c-.257-.058-.426-.141-.551-.249-.126-.107-.24-.268-.344-.533a.498.498 0 0 0-.812-.18.5.5 0 0 0-.117.173c-.071.175-.22.378-.422.535-.2.157-.418.242-.622.242s-.417-.085-.613-.24a1.4 1.4 0 0 1-.417-.537.5.5 0 0 0-.929.007c-.103.265-.218.426-.343.533s-.294.191-.55.25a.5.5 0 1 0 .219.975c.369-.083.7-.224.982-.466"/><defs><linearGradient id="i21c904-a" x1="6.444" x2="8.996" y1="1" y2="19.141" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i21c904-c" x1="7.167" x2="9.881" y1="1" y2="19.093" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i21c904-d" x1="5" x2="15.979" y1="5.018" y2="16.265" gradientUnits="userSpaceOnUse"><stop stop-color="#3477EA"/><stop offset="1" stop-color="#1D53A4"/></linearGradient><linearGradient id="i21c904-e" x1="5" x2="15.979" y1="5.018" y2="16.265" gradientUnits="userSpaceOnUse"><stop stop-color="#3477EA"/><stop offset="1" stop-color="#1D53A4"/></linearGradient><linearGradient id="i21c904-f" x1="5" x2="15.979" y1="5.018" y2="16.265" gradientUnits="userSpaceOnUse"><stop stop-color="#3477EA"/><stop offset="1" stop-color="#1D53A4"/></linearGradient><radialGradient id="i21c904-b" cx="0" cy="0" r="1" gradientTransform="matrix(8.44455 14.25 -11.71825 6.94424 7.111 5.687)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    notebook: {
      label: 'Notebook', category: 'fabric', group: 'Data Engineering',
      svg: `<path fill="url(#ia65f4b-a)" d="M3.047 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z"/><path fill="url(#ia65f4b-b)" fill-opacity=".2" d="M3.047 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z"/><path fill="url(#ia65f4b-c)" fill-rule="evenodd" d="M17.047 3a2 2 0 0 0-2-2h-10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2zm-12-1h10a1 1 0 0 1 1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-9.5a2 2 0 0 0-1 .268V3a1 1 0 0 1 1-1m-1 15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5a2.5 2.5 0 0 1-1.5.5h-9.5a1 1 0 0 0-1 1" clip-rule="evenodd"/><path fill="url(#ia65f4b-d)" d="M11.485 4.621a.5.5 0 1 0-.97-.242l-1.75 7a.5.5 0 0 0 .97.242z"/><path fill="url(#ia65f4b-e)" d="M12.116 5.553a.5.5 0 0 0 0 .707L13.856 8l-1.74 1.74a.5.5 0 1 0 .707.707l2.023-2.023a.6.6 0 0 0 0-.848l-2.023-2.023a.5.5 0 0 0-.707 0"/><path fill="url(#ia65f4b-f)" d="M7.916 5.584a.5.5 0 0 1 0 .707L6.206 8l1.71 1.709a.5.5 0 0 1-.707.707L5.217 8.424a.6.6 0 0 1 0-.848l1.992-1.992a.5.5 0 0 1 .707 0"/><defs><linearGradient id="ia65f4b-a" x1="6.936" x2="9.834" y1="1" y2="19.034" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="ia65f4b-c" x1="7.568" x2="10.649" y1="1" y2="18.972" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ia65f4b-d" x1="5.041" x2="12.85" y1="4" y2="13.741" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><linearGradient id="ia65f4b-e" x1="5.041" x2="12.85" y1="4" y2="13.741" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><linearGradient id="ia65f4b-f" x1="5.041" x2="12.85" y1="4" y2="13.741" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="ia65f4b-b" cx="0" cy="0" r="1" gradientTransform="matrix(7.38888 14.24997 -10.91858 5.6615 7.52 5.688)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    environment: {
      label: 'Environment', category: 'fabric', group: 'Data Engineering',
      svg: `<path fill="url(#ie27c58-a)" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0"/><path fill="url(#ie27c58-b)" fill-opacity=".2" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0"/><path fill="url(#ie27c58-c)" fill-rule="evenodd" d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14m0 1a8 8 0 1 0 0-16 8 8 0 0 0 0 16" clip-rule="evenodd"/><path fill="url(#ie27c58-d)" fill-rule="evenodd" d="M11.474 6.945a.75.75 0 0 0-1.448-.39l-1.75 6.5a.75.75 0 0 0 1.448.39zm1.497 5.085a.75.75 0 0 1 0-1.06l.97-.97-.97-.97a.75.75 0 0 1 1.06-1.06l1.43 1.429a.85.85 0 0 1 0 1.202l-1.43 1.43a.75.75 0 0 1-1.06 0Zm-5.94-4.06a.75.75 0 0 1 0 1.06l-.97.97.97.97a.75.75 0 0 1-1.06 1.06l-1.43-1.429a.85.85 0 0 1 0-1.202l1.43-1.43a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/><defs><linearGradient id="ie27c58-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="ie27c58-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ie27c58-d" x1="4.292" x2="11.812" y1="6" y2="16.732" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="ie27c58-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Data Warehouse ──
    warehouse: {
      label: 'Warehouse', category: 'fabric', group: 'Data Warehouse',
      svg: `<path fill="url(#ifed2b1-a)" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#ifed2b1-b)" fill-opacity=".2" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#ifed2b1-c)" fill-rule="evenodd" d="M15.5 2h-11A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 15.5 2m-11-1A2.5 2.5 0 0 0 2 3.5v13A2.5 2.5 0 0 0 4.5 19h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 15.5 1z" clip-rule="evenodd"/><path fill="url(#ifed2b1-d)" d="M9.577 15H13.5a1.5 1.5 0 0 0 1.5-1.5V9.668a1.5 1.5 0 0 0-.496-1.115l-3.5-3.15a1.5 1.5 0 0 0-2.007 0l-3.5 3.15A1.5 1.5 0 0 0 5 9.668V13.5A1.5 1.5 0 0 0 6.5 15h3.923"/><path fill="#B4CDF8" d="M7 10.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5m3.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m3 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-3 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7.75 13a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/><defs><linearGradient id="ifed2b1-a" x1="6.444" x2="8.996" y1="1" y2="19.141" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="ifed2b1-c" x1="7.167" x2="9.881" y1="1" y2="19.093" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ifed2b1-d" x1="5" x2="15.488" y1="4.5" y2="14.488" gradientUnits="userSpaceOnUse"><stop stop-color="#3477EA"/><stop offset="1" stop-color="#1D53A4"/></linearGradient><radialGradient id="ifed2b1-b" cx="0" cy="0" r="1" gradientTransform="matrix(8.44455 14.25 -11.71825 6.94424 7.111 5.687)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    datamart: {
      label: 'Datamart', category: 'fabric', group: 'Data Warehouse',
      svg: `<path fill="url(#i3247cc-a)" d="M1 4.5A2.5 2.5 0 0 1 3.5 2h13A2.5 2.5 0 0 1 19 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 15.5z"/><path fill="url(#i3247cc-b)" fill-opacity=".2" d="M1 4.5A2.5 2.5 0 0 1 3.5 2h13A2.5 2.5 0 0 1 19 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 15.5z"/><path fill="url(#i3247cc-c)" fill-rule="evenodd" d="M16.5 3h-13A1.5 1.5 0 0 0 2 4.5v11A1.5 1.5 0 0 0 3.5 17h13a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 16.5 3m-13-1A2.5 2.5 0 0 0 1 4.5v11A2.5 2.5 0 0 0 3.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 16.5 2z" clip-rule="evenodd"/><path fill="url(#i3247cc-d)" d="M8.5 11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/><path fill="url(#i3247cc-e)" d="M10.75 11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/><path fill="url(#i3247cc-f)" d="M13 11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/><path fill="url(#i3247cc-g)" fill-rule="evenodd" d="M5.2 5.341A1 1 0 0 1 5.954 5h8.093a1 1 0 0 1 .752.341l1.75 2c.566.647.107 1.659-.752 1.659H15v4.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 13.5V9h-.797c-.859 0-1.318-1.012-.752-1.659l1.75-2ZM6 9v4.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V9z" clip-rule="evenodd"/><defs><linearGradient id="i3247cc-a" x1="6" x2="7.805" y1="2" y2="18.244" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i3247cc-c" x1="6.813" x2="8.734" y1="2" y2="18.217" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i3247cc-d" x1="3.201" x2="12.747" y1="5" y2="17.979" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="i3247cc-e" x1="3.201" x2="12.747" y1="5" y2="17.979" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="i3247cc-f" x1="3.201" x2="12.747" y1="5" y2="17.979" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="i3247cc-g" x1="3.201" x2="12.747" y1="5" y2="17.979" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><radialGradient id="i3247cc-b" cx="0" cy="0" r="1" gradientTransform="matrix(9.49998 12.66664 -11.4 8.55 6.75 6.167)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Data Science ──
    ml_model: {
      label: 'ML Model', category: 'fabric', group: 'Data Science',
      svg: `<path fill="url(#i173c11-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i173c11-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i173c11-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i173c11-d)" fill-rule="evenodd" d="M8.925 14.315q.06.028.12.053l.023.011q.12.057.24.08c.444.127.914.129 1.358.005a1 1 0 0 0 .266-.085l.118-.056.025-.013 2.005-.96a2.5 2.5 0 0 0 1.42-2.254V8.17a1.5 1.5 0 0 0-.804-1.328l-2.54-1.331a2.5 2.5 0 0 0-2.313-.004L6.277 6.843a1.5 1.5 0 0 0-.808 1.33v2.922a2.5 2.5 0 0 0 1.429 2.26zm1.096-4.949-.021.01-.02-.007.02.029zm-.573 4.086.052.02v-2.416a2 2 0 0 0-1.136-1.803L6.5 8.36v2.736a1.5 1.5 0 0 0 .852 1.352zm1.052.016a1 1 0 0 0 .124-.05l2.024-.97a1.5 1.5 0 0 0 .852-1.352V8.36l-1.864.893a2 2 0 0 0-1.136 1.803z" clip-rule="evenodd"/><defs><linearGradient id="i173c11-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i173c11-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i173c11-d" x1="5.469" x2="14.793" y1="5.226" y2="14.253" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="i173c11-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    experiment: {
      label: 'Experiment', category: 'fabric', group: 'Data Science',
      svg: `<path fill="url(#ie285f9-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ie285f9-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ie285f9-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#ie285f9-d)" fill-rule="evenodd" d="M12 6v2.986c0 .253.064.502.186.723l1.687 3.068A1.5 1.5 0 0 1 12.56 15H7.442a1.5 1.5 0 0 1-1.315-2.223L7.815 9.71A1.5 1.5 0 0 0 8 8.986V6h-.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zm-4.304 6h4.609l.692 1.259a.5.5 0 0 1-.438.741H7.442a.5.5 0 0 1-.439-.741z" clip-rule="evenodd"/><defs><linearGradient id="ie285f9-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="ie285f9-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ie285f9-d" x1="5.939" x2="15.727" y1="5" y2="12.949" gradientUnits="userSpaceOnUse"><stop stop-color="#4BA446"/><stop offset="1" stop-color="#3F7D35"/></linearGradient><radialGradient id="ie285f9-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Real-Time Intelligence ──
    eventhouse: {
      label: 'Eventhouse', category: 'fabric', group: 'Real-Time Intelligence',
      svg: `<g clip-path="url(#i811c1a-a)"><mask id="i811c1a-b" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" d="M20 0H0v20h20z"/></mask><g mask="url(#i811c1a-b)"><path fill="url(#i811c1a-c)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i811c1a-d)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i811c1a-e)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i811c1a-f)" d="M9.577 15H13.5a1.5 1.5 0 0 0 1.5-1.5V9.668a1.5 1.5 0 0 0-.496-1.115l-3.5-3.15a1.5 1.5 0 0 0-2.007 0l-3.5 3.15A1.5 1.5 0 0 0 5 9.668V13.5A1.5 1.5 0 0 0 6.5 15h3.923"/><path fill="#F5F5F5" d="M19.56 11.44c-.28-.28-.66-.44-1.06-.44h-5c-.19 0-.38.04-.55.11l-.14.07-.13.08c-.15.1-.28.23-.44.46l-.04.07-.08.14c-.03.07-.05.13-.07.2l-.03.12v.06c-.03.16-.02.32 0 .49.06.29.2.56.41.76l.1.1c-.15.07-.28.16-.4.28l-.71.71a1.5 1.5 0 0 0 0 2.12c.12.12.27.22.42.29l-.42.42a1.499 1.499 0 1 0 2.12 2.12l.42-.42c.07.15.17.3.29.42a1.5 1.5 0 0 0 2.12 0l.71-.71c.12-.12.2-.26.27-.41l.08.08c.21.21.48.36.76.41l.2.03h.1c.2 0 .39-.04.59-.12.11-.05.2-.1.25-.14l.13-.1.06-.06.15-.17.05-.08c.17-.25.26-.54.26-.84V12.5c0-.4-.16-.78-.44-1.06z"/><path fill="url(#i811c1a-g)" d="M13.504 12h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.084.278l-.016.022a.5.5 0 0 1-.208.162.5.5 0 0 1-.545-.108l-5-5a.5.5 0 0 1-.077-.609l.01-.015.014-.022a.5.5 0 0 1 .406-.208"/><path fill="url(#i811c1a-h)" d="M13.56 14.653a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 0 1-.707-.708l.707-.707a.5.5 0 0 1 .708 0Z"/><path fill="url(#i811c1a-i)" d="M16.39 17.482a.5.5 0 0 1 0 .707l-.708.707a.5.5 0 1 1-.707-.707l.707-.707a.5.5 0 0 1 .707 0Z"/><path fill="url(#i811c1a-j)" d="M14.975 16.068a.5.5 0 0 1 0 .707l-2.121 2.121a.5.5 0 1 1-.707-.707l2.12-2.121a.5.5 0 0 1 .708 0"/></g></g><defs><linearGradient id="i811c1a-c" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i811c1a-e" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i811c1a-f" x1="5" x2="15.488" y1="4.5" y2="14.488" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i811c1a-g" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i811c1a-h" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i811c1a-i" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i811c1a-j" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><radialGradient id="i811c1a-d" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient><clipPath id="i811c1a-a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs>`
    },
    kql_database: {
      label: 'KQL Database', category: 'fabric', group: 'Real-Time Intelligence',
      svg: `<g clip-path="url(#i684bc8-a)"><mask id="i684bc8-b" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" d="M20 0H0v20h20z"/></mask><g mask="url(#i684bc8-b)"><path fill="url(#i684bc8-c)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i684bc8-d)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i684bc8-e)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i684bc8-f)" d="M10 9c1.193 0 2.317-.18 3.18-.503.283-.106.561-.237.812-.397L14 12.75c0 .775-.615 1.342-1.302 1.685-.716.358-1.67.565-2.698.565s-1.982-.207-2.699-.565C6.615 14.092 6 13.525 6 12.75l-.008-4.66c.255.165.539.298.828.407C7.683 8.82 8.807 9 10 9"/><path fill="url(#i684bc8-g)" d="M13.99 6.61A.6.6 0 0 0 14 6.5c0-.828-1.79-1.5-4-1.5s-4 .672-4 1.5a.6.6 0 0 0 .011.113C6.165 7.389 7.892 8 10 8c2.11 0 3.838-.613 3.99-1.39"/><path fill="#F5F5F5" d="M19.56 11.44c-.28-.28-.66-.44-1.06-.44h-5c-.19 0-.38.04-.55.11l-.14.07-.13.08c-.15.1-.28.23-.44.46l-.04.07-.08.14c-.03.07-.05.13-.07.2l-.03.12v.06c-.03.16-.02.32 0 .49.06.29.2.56.41.76l.1.1c-.15.07-.28.16-.4.28l-.71.71a1.5 1.5 0 0 0 0 2.12c.12.12.27.22.42.29l-.42.42a1.499 1.499 0 1 0 2.12 2.12l.42-.42c.07.15.17.3.29.42a1.5 1.5 0 0 0 2.12 0l.71-.71c.12-.12.2-.26.27-.41l.08.08c.21.21.48.36.76.41l.2.03h.1c.2 0 .39-.04.59-.12.11-.05.2-.1.25-.14l.13-.1.06-.06.15-.17.05-.08c.17-.25.26-.54.26-.84V12.5c0-.4-.16-.78-.44-1.06z"/><path fill="url(#i684bc8-h)" d="M13.504 12h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.084.278l-.016.022a.5.5 0 0 1-.208.162.5.5 0 0 1-.545-.108l-5-5a.5.5 0 0 1-.077-.609l.01-.015.014-.022a.5.5 0 0 1 .406-.208"/><path fill="url(#i684bc8-i)" d="M13.56 14.653a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707-.707l.707-.707a.5.5 0 0 1 .708 0Z"/><path fill="url(#i684bc8-j)" d="M16.39 17.482a.5.5 0 0 1 0 .707l-.708.707a.5.5 0 1 1-.707-.707l.707-.707a.5.5 0 0 1 .707 0Z"/><path fill="url(#i684bc8-k)" d="M14.975 16.068a.5.5 0 0 1 0 .707l-2.121 2.121a.5.5 0 1 1-.707-.707l2.12-2.121a.5.5 0 0 1 .708 0"/></g></g><defs><linearGradient id="i684bc8-c" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i684bc8-e" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i684bc8-f" x1="5.992" x2="15.75" y1="5" y2="12.815" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i684bc8-g" x1="5.992" x2="15.75" y1="5" y2="12.815" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i684bc8-h" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i684bc8-i" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i684bc8-j" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><linearGradient id="i684bc8-k" x1="12" x2="19.042" y1="12" y2="19.004" gradientUnits="userSpaceOnUse"><stop stop-color="#008EE6"/><stop offset="1" stop-color="#006094"/></linearGradient><radialGradient id="i684bc8-d" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient><clipPath id="i684bc8-a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs>`
    },
    eventstream: {
      label: 'Eventstream', category: 'fabric', group: 'Real-Time Intelligence',
      svg: `<path fill="url(#i1306d2-a)" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#i1306d2-b)" fill-opacity=".2" d="M2 3.5A2.5 2.5 0 0 1 4.5 1h11A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 16.5z"/><path fill="url(#i1306d2-c)" fill-rule="evenodd" d="M15.5 2h-11A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 15.5 2m-11-1A2.5 2.5 0 0 0 2 3.5v13A2.5 2.5 0 0 0 4.5 19h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 15.5 1z" clip-rule="evenodd"/><path fill="url(#i1306d2-d)" d="M12.375 5a4.375 4.375 0 0 0-4.374 4.281.727.727 0 0 1-.728.727H5.531a.5.5 0 0 0 0 1h1.742c.923 0 1.676-.723 1.725-1.633H9A3.375 3.375 0 0 1 12.375 6H13.5a.5.5 0 1 0 0-1z"/><path fill="url(#i1306d2-e)" d="M8.586 15.008c.45 0 .883-.066 1.293-.188a3.5 3.5 0 0 1-.573-.886 3.5 3.5 0 0 1-.72.074H6.53a.5.5 0 0 0 0 1z"/><path fill="url(#i1306d2-f)" d="M9.022 12.898a3.5 3.5 0 0 1 .046-1.088c-.236.121-.503.19-.787.19H5.5a.5.5 0 0 0 0 1h2.781q.387-.002.741-.102"/><path fill="url(#i1306d2-g)" d="M12.5 8.031a1.5 1.5 0 0 0-1.487 1.3 3.5 3.5 0 0 0-1.013.72v-.52a2.5 2.5 0 0 1 2.5-2.5h1.156a.5.5 0 0 1 0 1z"/><path fill="url(#i1306d2-h)" fill-rule="evenodd" d="M9.817 12.232a1.555 1.555 0 0 0 1.094-1.896l-.007-.025a2.7 2.7 0 0 1 .627-.339c.57.486 1.411.493 1.99.02q.355.146.654.38a1.56 1.56 0 0 0 1.013 1.711 2.8 2.8 0 0 1 .02.713l-.026.007a1.556 1.556 0 0 0-1.094 1.895l.007.026a2.7 2.7 0 0 1-.627.338 1.555 1.555 0 0 0-1.989-.02 2.7 2.7 0 0 1-.655-.38 1.56 1.56 0 0 0-1.012-1.71 2.8 2.8 0 0 1-.02-.713zm2.1.285a.584.584 0 1 0 1.166 0 .584.584 0 0 0-1.167 0Z" clip-rule="evenodd"/><defs><linearGradient id="i1306d2-a" x1="6.444" x2="8.996" y1="1" y2="19.141" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i1306d2-c" x1="7.167" x2="9.881" y1="1" y2="19.093" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i1306d2-d" x1="5" x2="15.061" y1="5" y2="15.22" gradientUnits="userSpaceOnUse"><stop stop-color="#E03F8F"/><stop offset="1" stop-color="#BD1E7B"/></linearGradient><linearGradient id="i1306d2-e" x1="5" x2="15.061" y1="5" y2="15.22" gradientUnits="userSpaceOnUse"><stop stop-color="#E03F8F"/><stop offset="1" stop-color="#BD1E7B"/></linearGradient><linearGradient id="i1306d2-f" x1="5" x2="15.061" y1="5" y2="15.221" gradientUnits="userSpaceOnUse"><stop stop-color="#E03F8F"/><stop offset="1" stop-color="#BD1E7B"/></linearGradient><linearGradient id="i1306d2-g" x1="5" x2="15.061" y1="5" y2="15.22" gradientUnits="userSpaceOnUse"><stop stop-color="#E03F8F"/><stop offset="1" stop-color="#BD1E7B"/></linearGradient><linearGradient id="i1306d2-h" x1="5" x2="15.061" y1="5" y2="15.22" gradientUnits="userSpaceOnUse"><stop stop-color="#E03F8F"/><stop offset="1" stop-color="#BD1E7B"/></linearGradient><radialGradient id="i1306d2-b" cx="0" cy="0" r="1" gradientTransform="matrix(8.44455 14.25 -11.71825 6.94424 7.111 5.687)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Power BI ──
    report: {
      label: 'Report', category: 'fabric', group: 'Power BI',
      svg: `<path fill="url(#ic272f8-i6a8c89-paint0_linear_62917_1969)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ic272f8-i6a8c89-paint1_radial_62917_1969)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ic272f8-i6a8c89-paint2_linear_62917_1969)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#ic272f8-i6a8c89-paint3_linear_62917_1969)" fill-rule="evenodd" d="M5.5 14.25v-8.5a.75.75 0 0 1 1.5 0v8.5a.75.75 0 0 1-1.5 0" clip-rule="evenodd"/><path fill="url(#ic272f8-i6a8c89-paint4_linear_62917_1969)" fill-rule="evenodd" d="M9.25 14.25v-5.5a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0" clip-rule="evenodd"/><path fill="url(#ic272f8-i6a8c89-paint5_linear_62917_1969)" fill-rule="evenodd" d="M13.75 11a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/><path fill="#F5F5F5" fill-rule="evenodd" d="M17.5 8a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5v-7A2.5 2.5 0 0 1 13.5 8z" clip-rule="evenodd"/><path fill="url(#ic272f8-i6a8c89-paint6_linear_62917_1969)" d="M12 10.5A1.5 1.5 0 0 1 13.5 9h4a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5z"/><path fill="#F5F5F5" d="M16.5 16.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/><defs><linearGradient id="ic272f8-i6a8c89-paint0_linear_62917_1969" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><radialGradient id="ic272f8-i6a8c89-paint1_radial_62917_1969" cx="0" cy="0" r="1" gradientTransform="matrix(8.44444 12.6667 -12.6667 4.75 7.111 6.167)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient><linearGradient id="ic272f8-i6a8c89-paint2_linear_62917_1969" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ic272f8-i6a8c89-paint3_linear_62917_1969" x1="5.5" x2="15.445" y1="5" y2="13.95" gradientUnits="userSpaceOnUse"><stop stop-color="#C28400"/><stop offset="1" stop-color="#A86500"/></linearGradient><linearGradient id="ic272f8-i6a8c89-paint4_linear_62917_1969" x1="5.5" x2="15.445" y1="5" y2="13.95" gradientUnits="userSpaceOnUse"><stop stop-color="#C28400"/><stop offset="1" stop-color="#A86500"/></linearGradient><linearGradient id="ic272f8-i6a8c89-paint5_linear_62917_1969" x1="5.5" x2="15.445" y1="5" y2="13.95" gradientUnits="userSpaceOnUse"><stop stop-color="#C28400"/><stop offset="1" stop-color="#A86500"/></linearGradient><linearGradient id="ic272f8-i6a8c89-paint6_linear_62917_1969" x1="12" x2="21.396" y1="9" y2="15.577" gradientUnits="userSpaceOnUse"><stop stop-color="#C28400"/><stop offset="1" stop-color="#A86500"/></linearGradient></defs>`
    },
    dashboard_pbi: {
      label: 'Dashboard', category: 'fabric', group: 'Power BI',
      svg: `<path fill="url(#i92536a-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i92536a-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#i92536a-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#i92536a-d)" d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10"/><path fill="#F4D58A" fill-rule="evenodd" d="M10 7.5a2.5 2.5 0 0 0-2.064 3.91.5.5 0 1 1-.825.566A3.5 3.5 0 0 1 10 6.5a.5.5 0 0 1-.001 1Z" clip-rule="evenodd"/><path fill="#F4D58A" d="M13.064 6.864a.375.375 0 0 0-.476-.008l-.133.105a221 221 0 0 0-1.432 1.149 93 93 0 0 0-1.136.93c-.163.137-.307.26-.42.36a3 3 0 0 0-.257.245 1.125 1.125 0 0 0 1.711 1.462c.054-.064.128-.175.203-.293.08-.127.179-.289.288-.471.22-.366.485-.822.742-1.267a229 229 0 0 0 .91-1.595l.083-.147a.375.375 0 0 0-.083-.47"/><defs><linearGradient id="i92536a-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="i92536a-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="i92536a-d" x1="5" x2="15" y1="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#C28400"/><stop offset="1" stop-color="#A86500"/></linearGradient><radialGradient id="i92536a-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },
    semantic_model: {
      label: 'Semantic Model', category: 'fabric', group: 'Power BI',
      svg: `<path fill="url(#ib49b87-a)" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ib49b87-b)" fill-opacity=".2" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5z"/><path fill="url(#ib49b87-c)" fill-rule="evenodd" d="M15.5 3h-11A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3m-11-1A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2z" clip-rule="evenodd"/><path fill="url(#ib49b87-d)" d="M6 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/><path fill="url(#ib49b87-e)" d="M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/><path fill="url(#ib49b87-f)" d="M15 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/><path fill="url(#ib49b87-g)" d="M10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/><path fill="url(#ib49b87-h)" d="M7 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/><path fill="#F5F5F5" d="M9 16.5a3.5 3.5 0 0 1 3.5-3.5h4a3.5 3.5 0 1 1 0 7h-4A3.5 3.5 0 0 1 9 16.5"/><path fill="url(#ib49b87-i)" d="M12.5 14a2.5 2.5 0 0 0 0 5h.5a.5.5 0 0 0 0-1h-.5a1.5 1.5 0 0 1 0-3h.5a.5.5 0 0 0 0-1z"/><path fill="url(#ib49b87-j)" d="M16 14a.5.5 0 0 0 0 1h.5a1.5 1.5 0 0 1 0 3H16a.5.5 0 0 0 0 1h.5a2.5 2.5 0 0 0 0-5z"/><path fill="url(#ib49b87-k)" d="M12.5 16a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/><defs><linearGradient id="ib49b87-a" x1="6.444" x2="8.468" y1="2" y2="18.192" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EBEBEB"/></linearGradient><linearGradient id="ib49b87-c" x1="7.167" x2="9.321" y1="2" y2="18.157" gradientUnits="userSpaceOnUse"><stop stop-color="#BBB"/><stop offset="1" stop-color="#888"/></linearGradient><linearGradient id="ib49b87-d" x1="5" x2="10.294" y1="7" y2="15.823" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-e" x1="5" x2="10.294" y1="7" y2="15.823" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-f" x1="5" x2="10.294" y1="7" y2="15.823" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-g" x1="5" x2="10.294" y1="7" y2="15.823" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-h" x1="5" x2="10.294" y1="7" y2="15.823" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-i" x1="10" x2="14.245" y1="14" y2="21.642" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-j" x1="10" x2="14.245" y1="14" y2="21.642" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><linearGradient id="ib49b87-k" x1="10" x2="14.245" y1="14" y2="21.642" gradientUnits="userSpaceOnUse"><stop stop-color="#7751B8"/><stop offset="1" stop-color="#5A409C"/></linearGradient><radialGradient id="ib49b87-b" cx="0" cy="0" r="1" gradientTransform="rotate(56.31 -2.206 9.727)scale(15.2234 13.1741)" gradientUnits="userSpaceOnUse"><stop offset=".177" stop-color="#fff"/><stop offset="1" stop-color="#B8B8B8"/></radialGradient></defs>`
    },

    // ── Fabric: Governance ──
    workspace: {
      label: 'Workspace', category: 'fabric', group: 'Governance',
      svg: `<path fill="url(#i6f4896-a)" d="M5 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0m2-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m4.779 2.584a2 2 0 1 1 2.442-3.168 2 2 0 0 1-2.442 3.168M13 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2M4.5 8h2.67c-.11.313-.17.65-.17 1H4.5a.5.5 0 0 0-.5.5c0 .817.325 1.423.838 1.835.236.19.519.343.839.454a2.5 2.5 0 0 0-.532.869 3.7 3.7 0 0 1-.933-.543C3.46 11.51 3 10.616 3 9.5A1.5 1.5 0 0 1 4.5 8m3.768 0a2 2 0 1 0 3.466 2 2 2 0 0 0-3.466-2m1.508.025A1.003 1.003 0 0 1 11 9a1 1 0 1 1-1.224-.975m5.386 3.31a2.8 2.8 0 0 1-.839.454 2.5 2.5 0 0 1 .531.869c.34-.139.655-.32.934-.543C16.54 11.51 17 10.616 17 9.5A1.5 1.5 0 0 0 15.5 8h-2.67c.11.313.17.65.17 1h2.5a.5.5 0 0 1 .5.5c0 .817-.325 1.423-.838 1.835M12.5 12a1.5 1.5 0 0 1 1.5 1.5c0 1.116-.459 2.01-1.212 2.615-.741.595-1.735.885-2.788.885s-2.047-.29-2.788-.885C6.46 15.51 6 14.616 6 13.5A1.496 1.496 0 0 1 7.5 12zm0 1h-5a.5.5 0 0 0-.5.5c0 .817.325 1.423.838 1.835C8.364 15.757 9.12 16 10 16s1.636-.243 2.162-.665c.513-.412.838-1.018.838-1.835a.5.5 0 0 0-.5-.5"/><defs><linearGradient id="i6f4896-a" x1="3" x2="17" y1="3" y2="17" gradientUnits="userSpaceOnUse"><stop stop-color="#209782"/><stop offset="1" stop-color="#0C695A"/></linearGradient></defs>`
    },

    // ── Fabric: AI ──
    copilot: {
      label: 'Copilot', category: 'fabric', group: 'AI',
      svg: `<path fill="url(#ied10f1-paint0_radial_42584_82286)" d="M14.144 3.35a1.875 1.875 0 0 0-1.8-1.35h-.6c-.897 0-1.668.634-1.84 1.513L8.853 8.85l.297-.959c.244-.785.97-1.32 1.791-1.32h3.294l1.4 1.172 1.246-1.172h-.391c-.833 0-1.566-.55-1.8-1.349z"/><path fill="url(#ied10f1-paint1_radial_42584_82286)" d="M6.05 16.643A1.875 1.875 0 0 0 7.85 18h1.224c1.01 0 1.838-.8 1.874-1.808l.18-5.05-.287.953a1.875 1.875 0 0 1-1.795 1.333H5.734l-1.384-.885-1.022.886h.385c.836 0 1.571.553 1.802 1.357z"/><path fill="url(#ied10f1-paint2_linear_42584_82286)" d="M12.25 2H5.688c-1.875 0-3 2.397-3.75 4.795-.889 2.84-2.051 6.64 1.312 6.64h2.861c.833 0 1.564-.547 1.8-1.345.494-1.67 1.354-4.568 2.03-6.776.345-1.126.632-2.092 1.072-2.694.247-.337.66-.62 1.237-.62"/><path fill="url(#ied10f1-paint3_linear_42584_82286)" d="M12.25 2H5.688c-1.875 0-3 2.397-3.75 4.795-.889 2.84-2.051 6.64 1.312 6.64h2.861c.833 0 1.564-.547 1.8-1.345.494-1.67 1.354-4.568 2.03-6.776.345-1.126.632-2.092 1.072-2.694.247-.337.66-.62 1.237-.62"/><path fill="url(#ied10f1-paint4_radial_42584_82286)" d="M7.749 18h6.562c1.875 0 3-2.397 3.75-4.793.889-2.84 2.051-6.637-1.312-6.637h-2.862c-.832 0-1.564.546-1.8 1.344a799 799 0 0 1-2.03 6.773c-.344 1.125-.631 2.092-1.072 2.693-.247.338-.658.62-1.236.62"/><path fill="url(#ied10f1-paint5_linear_42584_82286)" d="M7.749 18h6.562c1.875 0 3-2.397 3.75-4.793.889-2.84 2.051-6.637-1.312-6.637h-2.862c-.832 0-1.564.546-1.8 1.344a799 799 0 0 1-2.03 6.773c-.344 1.125-.631 2.092-1.072 2.693-.247.338-.658.62-1.236.62"/><defs><radialGradient id="ied10f1-paint0_radial_42584_82286" cx="0" cy="0" r="1" gradientTransform="rotate(-129.141 9.971 .712)scale(7.20751 6.76953)" gradientUnits="userSpaceOnUse"><stop offset=".096" stop-color="#00AEFF"/><stop offset=".773" stop-color="#2253CE"/><stop offset="1" stop-color="#0736C4"/></radialGradient><radialGradient id="ied10f1-paint1_radial_42584_82286" cx="0" cy="0" r="1" gradientTransform="matrix(4.0792 5.17124 -5.02078 3.9605 4.743 13.4)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB657"/><stop offset=".634" stop-color="#FF5F3D"/><stop offset=".923" stop-color="#C02B3C"/></radialGradient><linearGradient id="ied10f1-paint2_linear_42584_82286" x1="5.295" x2="6.172" y1="3.385" y2="13.87" gradientUnits="userSpaceOnUse"><stop offset=".156" stop-color="#0D91E1"/><stop offset=".487" stop-color="#52B471"/><stop offset=".652" stop-color="#98BD42"/><stop offset=".937" stop-color="#FFC800"/></linearGradient><linearGradient id="ied10f1-paint3_linear_42584_82286" x1="6.113" x2="6.592" y1="2" y2="13.435" gradientUnits="userSpaceOnUse"><stop stop-color="#3DCBFF"/><stop offset=".247" stop-color="#0588F7" stop-opacity="0"/></linearGradient><radialGradient id="ied10f1-paint4_radial_42584_82286" cx="0" cy="0" r="1" gradientTransform="matrix(-5.18437 14.3365 -17.62744 -6.37443 17.086 5.45)" gradientUnits="userSpaceOnUse"><stop offset=".066" stop-color="#8C48FF"/><stop offset=".5" stop-color="#F2598A"/><stop offset=".896" stop-color="#FFB152"/></radialGradient><linearGradient id="ied10f1-paint5_linear_42584_82286" x1="17.604" x2="17.598" y1="5.872" y2="8.985" gradientUnits="userSpaceOnUse"><stop offset=".058" stop-color="#F8ADFA"/><stop offset=".708" stop-color="#A86EDD" stop-opacity="0"/></linearGradient></defs>`
    },

    // ── Fabric: Platform ──
    fabric: {
      label: 'Fabric', category: 'fabric', group: 'Platform',
      svg: `<path fill="url(#i535419-a)" fill-rule="evenodd" d="m2.656 13.042-.234.858c-.088.274-.21.677-.276 1.036a2.252 2.252 0 0 0 1.856 3.036c.316.045.675.043 1.076-.016l1.846-.255a1.17 1.17 0 0 0 .968-.85l1.27-4.666z" clip-rule="evenodd"/><path fill="url(#i535419-b)" d="M4.456 13.263c-1.945.301-2.344 1.77-2.344 1.77l1.863-6.846 9.734-1.317-1.327 4.822a.68.68 0 0 1-.556.497l-.054.01-7.37 1.073z"/><path fill="url(#i535419-c)" fill-opacity=".8" d="M4.456 13.263c-1.945.301-2.344 1.77-2.344 1.77l1.863-6.846 9.734-1.317-1.327 4.822a.68.68 0 0 1-.556.497l-.054.01-7.37 1.073z"/><path fill="url(#i535419-d)" d="m5.56 8.895 10.777-1.592a.64.64 0 0 0 .53-.468l1.111-4.025a.637.637 0 0 0-.614-.81 1 1 0 0 0-.081.005L7 3.525a2.87 2.87 0 0 0-2.312 2.077l-1.483 5.375c.298-1.087.481-1.743 2.355-2.082"/><path fill="url(#i535419-e)" fill-opacity=".4" d="m5.56 8.895 10.777-1.592a.64.64 0 0 0 .53-.468l1.111-4.025a.637.637 0 0 0-.614-.81 1 1 0 0 0-.081.005L7 3.525a2.87 2.87 0 0 0-2.312 2.077l-1.483 5.375c.298-1.087.481-1.743 2.355-2.082"/><path fill="url(#i535419-f)" d="M5.56 8.896c-1.56.282-1.948.785-2.206 1.573l-1.242 4.564s.397-1.453 2.318-1.764l7.343-1.07.054-.008a.68.68 0 0 0 .555-.498l1.092-3.966z"/><path fill="url(#i535419-g)" fill-opacity=".2" d="M5.56 8.896c-1.56.282-1.948.785-2.206 1.573l-1.242 4.564s.397-1.453 2.318-1.764l7.343-1.07.054-.008a.68.68 0 0 0 .555-.498l1.092-3.966z"/><path fill="url(#i535419-h)" fill-rule="evenodd" d="M4.43 13.27c-1.624.262-2.157 1.338-2.284 1.665A2.254 2.254 0 0 0 4 17.972q.476.07 1.077-.016l1.846-.254c.464-.064.845-.4.968-.852l1.158-4.253-4.62.673Z" clip-rule="evenodd"/><defs><linearGradient id="i535419-a" x1="5.581" x2="5.581" y1="18.003" y2="12.185" gradientUnits="userSpaceOnUse"><stop offset=".056" stop-color="#2AAC94"/><stop offset=".155" stop-color="#239C87"/><stop offset=".372" stop-color="#177E71"/><stop offset=".588" stop-color="#0E6961"/><stop offset=".799" stop-color="#095D57"/><stop offset="1" stop-color="#085954"/></linearGradient><linearGradient id="i535419-b" x1="12.934" x2="7.315" y1="13.781" y2="7.67" gradientUnits="userSpaceOnUse"><stop offset=".042" stop-color="#ABE88E"/><stop offset=".549" stop-color="#2AAA92"/><stop offset=".906" stop-color="#117865"/></linearGradient><linearGradient id="i535419-c" x1="-.873" x2="4.474" y1="13.484" y2="11.661" gradientUnits="userSpaceOnUse"><stop stop-color="#6AD6F9"/><stop offset="1" stop-color="#6AD6F9" stop-opacity="0"/></linearGradient><linearGradient id="i535419-d" x1="3.205" x2="16.026" y1="4.499" y2="10.453" gradientUnits="userSpaceOnUse"><stop stop-color="#6AD6F9"/><stop offset=".23" stop-color="#60E9D0"/><stop offset=".651" stop-color="#6DE9BB"/><stop offset=".994" stop-color="#ABE88E"/></linearGradient><linearGradient id="i535419-e" x1="4.391" x2="11.363" y1="5.613" y2="7.155" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".459" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="i535419-f" x1="6.703" x2="6.868" y1="11.586" y2="6.697" gradientUnits="userSpaceOnUse"><stop offset=".205" stop-color="#063D3B" stop-opacity="0"/><stop offset=".586" stop-color="#063D3B" stop-opacity=".237"/><stop offset=".872" stop-color="#063D3B" stop-opacity=".75"/></linearGradient><linearGradient id="i535419-g" x1="1.524" x2="7.481" y1="11.1" y2="12.22" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".459" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="i535419-h" x1="5.827" x2="4.665" y1="16.391" y2="10.708" gradientUnits="userSpaceOnUse"><stop offset=".064" stop-color="#063D3B" stop-opacity="0"/><stop offset=".17" stop-color="#063D3B" stop-opacity=".135"/><stop offset=".562" stop-color="#063D3B" stop-opacity=".599"/><stop offset=".85" stop-color="#063D3B" stop-opacity=".9"/><stop offset="1" stop-color="#063D3B"/></linearGradient></defs>`
    },

    // ── External: Cloud ──
    azure_sql: {
      label: 'Azure SQL', category: 'external', group: 'Cloud', color: '#0078D4',
      svg: `<rect width="20" height="20" rx="4" fill="#0078D4"/><ellipse cx="10" cy="7" rx="5" ry="2.5" fill="#fff" opacity=".85"/><path d="M5 7v7c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5V7" fill="none" stroke="#fff" stroke-width="1.2"/>`
    },
    adls: {
      label: 'ADLS Gen2', category: 'external', group: 'Cloud', color: '#0078D4',
      svg: `<rect width="20" height="20" rx="4" fill="#0078D4"/><path d="M10 4L3 16h14z" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 13h8" stroke="#fff" stroke-width="1" opacity=".7"/>`
    },
    aws_s3: {
      label: 'AWS S3', category: 'external', group: 'Cloud', color: '#FF9900',
      svg: `<rect width="20" height="20" rx="4" fill="#FF9900"/><text x="10" y="13.5" text-anchor="middle" font-size="8" font-weight="bold" font-family="Arial,sans-serif" fill="#fff">S3</text>`
    },
    snowflake: {
      label: 'Snowflake', category: 'external', group: 'Cloud', color: '#29B5E8',
      svg: `<rect width="20" height="20" rx="4" fill="#29B5E8"/><g stroke="#fff" stroke-width="1.3" stroke-linecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/><line x1="5.8" y1="5.8" x2="14.2" y2="14.2"/><line x1="14.2" y1="5.8" x2="5.8" y2="14.2"/></g><circle cx="10" cy="10" r="1.5" fill="#fff"/>`
    },
    databricks: {
      label: 'Databricks', category: 'external', group: 'Cloud', color: '#FF3621',
      svg: `<rect width="20" height="20" rx="4" fill="#FF3621"/><path d="M10 3L4 10l6 7 6-7z" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/><path d="M7 10h6" stroke="#fff" stroke-width="1"/>`
    },
    // ── External: On-Premises ──
    sql_server: {
      label: 'SQL Server', category: 'external', group: 'On-Premises', color: '#CC2131',
      svg: `<rect width="20" height="20" rx="4" fill="#CC2131"/><ellipse cx="10" cy="7" rx="5" ry="2.5" fill="#fff" opacity=".85"/><path d="M5 7v7c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5V7" fill="none" stroke="#fff" stroke-width="1.2"/>`
    },
    oracle: {
      label: 'Oracle DB', category: 'external', group: 'On-Premises', color: '#F80000',
      svg: `<rect width="20" height="20" rx="4" fill="#F80000"/><text x="10" y="13.5" text-anchor="middle" font-size="6" font-weight="bold" font-family="Arial,sans-serif" fill="#fff">ORA</text>`
    },
    sap: {
      label: 'SAP', category: 'external', group: 'On-Premises', color: '#008FD3',
      svg: `<rect width="20" height="20" rx="4" fill="#008FD3"/><text x="10" y="13.5" text-anchor="middle" font-size="7" font-weight="bold" font-family="Arial,sans-serif" fill="#fff">SAP</text>`
    },
    // ── External: SaaS / API ──
    rest_api: {
      label: 'REST API', category: 'external', group: 'SaaS / API', color: '#6C757D',
      svg: `<rect width="20" height="20" rx="4" fill="#6C757D"/><text x="10" y="9" text-anchor="middle" font-size="10" font-weight="bold" font-family="monospace" fill="#fff">{</text><text x="10" y="17" text-anchor="middle" font-size="10" font-weight="bold" font-family="monospace" fill="#fff">}</text>`
    },
    sharepoint: {
      label: 'SharePoint', category: 'external', group: 'SaaS / API', color: '#038387',
      svg: `<rect width="20" height="20" rx="4" fill="#038387"/><text x="10" y="14" text-anchor="middle" font-size="11" font-weight="bold" font-family="Arial,sans-serif" fill="#fff">S</text>`
    },
  };




  // ── Shapes Registry ──────────────────────────────────────────────

  const SHAPES = {
    shape_rect:    { label: 'Rectangle',      group: 'Basic Shapes',  defaultColor: '#E3F2FD', w: 120, h: 72 },
    shape_rounded: { label: 'Rounded Rect',   group: 'Basic Shapes',  defaultColor: '#E8F5E9', w: 120, h: 72 },
    shape_circle:  { label: 'Circle',          group: 'Basic Shapes',  defaultColor: '#FFF3E0', w: 120, h: 72 },
    shape_diamond: { label: 'Diamond',         group: 'Basic Shapes',  defaultColor: '#F3E5F5', w: 120, h: 72 },
    shape_group:   { label: 'Group Container', group: 'Containers',    defaultColor: '#E3F2FD', w: 300, h: 200 },
    shape_text:    { label: 'Text',            group: 'Annotations',   defaultColor: 'transparent', w: 100, h: 30 }
  };

  const GRID_SIZE = 20;

  // ── Guide Page Map (Fabric components → documentation pages) ────
  const GUIDE_PAGE_MAP = {
    data_factory: 'best-practices.html', pipeline: 'best-practices.html',
    dataflow: 'best-practices.html', copy_job: 'best-practices.html',
    lakehouse: 'architecture.html#architecture', notebook: 'architecture.html#architecture',
    environment: 'architecture.html#architecture',
    warehouse: 'architecture.html#architecture', datamart: 'architecture.html#architecture',
    ml_model: 'best-practices.html#engineering', experiment: 'best-practices.html#engineering',
    eventhouse: 'architecture.html#real-time', kql_database: 'architecture.html#real-time',
    eventstream: 'architecture.html#real-time',
    report: 'best-practices.html#powerbi', dashboard_pbi: 'best-practices.html#powerbi',
    semantic_model: 'best-practices.html#powerbi',
    workspace: 'governance.html', copilot: 'fabric-iq.html', fabric: 'architecture.html'
  };

  // ── State ──────────────────────────────────────────────────────

  let state = {
    components: [],  // { id, type, x, y, label, notes, color?, width?, height?, fontSize? }
    connections: [], // { id, from, to, label? }
    snapToGrid: false
  };

  let undoStack = [];
  let redoStack = [];
  const MAX_UNDO = 30;

  // View transform
  let viewX = 0, viewY = 0, zoom = 1;

  // Interaction state
  let dragging = null;
  let connecting = null;
  let selected = new Set();    // component ids (multi-select)
  let selectedConn = null;     // connection id
  let nextId = 1;
  let resizing = null;
  let clipboard = [];          // copied component data for paste
  let nudgeUndoTimer = null;
  let nudgeUndoPushed = false;
  let guidesLayer = null;

  // DOM refs
  let canvas, wrapper, compLayer, connLayer, groupsLayer, defsEl, tempConn, selectRect;
  let paletteList, searchInput;

  // ── Helpers ──────────────────────────────────────────────────────

  function isShape(type) {
    return type && type.startsWith('shape_');
  }

  function getCompSize(comp) {
    if (comp.width != null && comp.height != null) return { w: comp.width, h: comp.height };
    if (isShape(comp.type)) {
      const def = SHAPES[comp.type];
      return def ? { w: def.w, h: def.h } : { w: COMP_W, h: COMP_H };
    }
    return { w: COMP_W, h: COMP_H };
  }

  function snapPos(v) {
    return state.snapToGrid ? Math.round(v / GRID_SIZE) * GRID_SIZE : Math.round(v);
  }

  // ── Initialization ─────────────────────────────────────────────

  function init() {
    canvas = document.getElementById('pg-canvas');
    wrapper = document.getElementById('pg-canvas-wrapper');
    compLayer = document.getElementById('pg-components-layer');
    connLayer = document.getElementById('pg-connections-layer');
    groupsLayer = document.getElementById('pg-groups-layer');
    defsEl = document.getElementById('pg-defs');
    tempConn = document.getElementById('pg-temp-conn');
    selectRect = document.getElementById('pg-select-rect');
    paletteList = document.getElementById('pg-palette-list');
    searchInput = document.getElementById('pg-search');
    guidesLayer = document.getElementById('pg-guides-layer');

    if (!canvas) return;

    buildPalette('fabric');
    bindPaletteTabs();
    bindSearch();
    bindCanvasEvents();
    bindToolbar();
    bindProperties();
    bindKeyboard();
    bindTemplates();
    bindImportExport();
    loadState();
    render();
  }

  // ── Palette ────────────────────────────────────────────────────

  function buildPalette(category) {
    const filter = searchInput ? searchInput.value.toLowerCase() : '';

    if (category === 'shapes') {
      buildShapesPalette(filter);
      return;
    }

    const items = Object.entries(ICONS)
      .filter(([, def]) => def.category === category)
      .filter(([, def]) => !filter || def.label.toLowerCase().includes(filter) || def.group.toLowerCase().includes(filter));

    let html = '';
    let currentGroup = '';
    items.forEach(([key, def]) => {
      if (def.group !== currentGroup) {
        currentGroup = def.group;
        html += `<div class="pg-palette-group">${currentGroup}</div>`;
      }
      html += `
        <div class="pg-palette-item" data-type="${key}" draggable="true" title="${def.label}">
          <svg class="pg-palette-icon" viewBox="0 0 20 20" width="28" height="28">${def.svg}</svg>
          <span>${def.label}</span>
        </div>`;
    });

    if (!items.length) {
      html = '<div class="pg-palette-empty">No components found</div>';
    }

    paletteList.innerHTML = html;
    bindPaletteItems();
  }

  function buildShapesPalette(filter) {
    const shapePreviews = {
      shape_rect:    '<rect x="2" y="4" width="24" height="16" fill="#E3F2FD" stroke="#90CAF9" stroke-width="1.5"/>',
      shape_rounded: '<rect x="2" y="4" width="24" height="16" rx="4" fill="#E8F5E9" stroke="#A5D6A7" stroke-width="1.5"/>',
      shape_circle:  '<ellipse cx="14" cy="12" rx="12" ry="9" fill="#FFF3E0" stroke="#FFCC80" stroke-width="1.5"/>',
      shape_diamond: '<polygon points="14,2 26,12 14,22 2,12" fill="#F3E5F5" stroke="#CE93D8" stroke-width="1.5"/>',
      shape_group:   '<rect x="2" y="3" width="24" height="18" fill="none" stroke="#90CAF9" stroke-width="1.5" stroke-dasharray="3 2"/><text x="5" y="9" font-size="5" fill="#64B5F6" font-family="sans-serif">Group</text>',
      shape_text:    '<text x="14" y="15" text-anchor="middle" font-size="10" fill="#666" font-family="sans-serif">Abc</text>'
    };

    const items = Object.entries(SHAPES)
      .filter(([, def]) => !filter || def.label.toLowerCase().includes(filter) || def.group.toLowerCase().includes(filter));

    let html = '';
    let currentGroup = '';
    items.forEach(([key, def]) => {
      if (def.group !== currentGroup) {
        currentGroup = def.group;
        html += `<div class="pg-palette-group">${currentGroup}</div>`;
      }
      html += `
        <div class="pg-palette-item" data-type="${key}" draggable="true" title="${def.label}">
          <svg class="pg-palette-icon" viewBox="0 0 28 24" width="28" height="24">${shapePreviews[key] || ''}</svg>
          <span>${def.label}</span>
        </div>`;
    });

    if (!items.length) {
      html = '<div class="pg-palette-empty">No shapes found</div>';
    }

    paletteList.innerHTML = html;
    bindPaletteItems();
  }

  function bindPaletteItems() {
    paletteList.querySelectorAll('.pg-palette-item').forEach(el => {
      el.addEventListener('dragstart', onPaletteDragStart);
      el.addEventListener('dblclick', onPaletteDoubleClick);
    });
  }

  function bindPaletteTabs() {
    document.querySelectorAll('.pg-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pg-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        buildPalette(tab.dataset.tab);
      });
    });
  }

  function bindSearch() {
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
      const activeTab = document.querySelector('.pg-tab.active');
      buildPalette(activeTab ? activeTab.dataset.tab : 'fabric');
    });
  }

  // ── Palette Drag & Drop ────────────────────────────────────────

  function onPaletteDragStart(e) {
    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.type);
    e.dataTransfer.effectAllowed = 'copy';
  }

  function onPaletteDoubleClick(e) {
    const type = e.currentTarget.dataset.type;
    const rect = wrapper.getBoundingClientRect();
    const sz = isShape(type) ? getCompSize({ type }) : { w: COMP_W, h: COMP_H };
    const cx = (rect.width / 2 - viewX) / zoom;
    const cy = (rect.height / 2 - viewY) / zoom;
    addComponent(type, cx - sz.w / 2, cy - sz.h / 2);
  }

  // ── Canvas Events ──────────────────────────────────────────────

  function bindCanvasEvents() {
    wrapper.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
    wrapper.addEventListener('drop', onCanvasDrop);
    canvas.addEventListener('pointerdown', onCanvasPointerDown);
    canvas.addEventListener('pointermove', onCanvasPointerMove);
    canvas.addEventListener('pointerup', onCanvasPointerUp);
    canvas.addEventListener('dblclick', onCanvasDblClick);
    wrapper.addEventListener('contextmenu', onContextMenu);
    wrapper.addEventListener('wheel', onCanvasWheel, { passive: false });
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
  }

  function updateCanvasSize() {
    if (!wrapper || !canvas) return;
    const rect = wrapper.getBoundingClientRect();
    canvas.setAttribute('width', rect.width);
    canvas.setAttribute('height', rect.height);
    canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    const gridBg = document.getElementById('pg-grid-bg');
    if (gridBg) {
      gridBg.setAttribute('width', rect.width);
      gridBg.setAttribute('height', rect.height);
    }
    updateViewTransform();
  }

  function onCanvasDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    if (!ICONS[type] && !SHAPES[type]) return;
    const rect = wrapper.getBoundingClientRect();
    const sz = isShape(type) ? getCompSize({ type }) : { w: COMP_W, h: COMP_H };
    const x = (e.clientX - rect.left - viewX) / zoom - sz.w / 2;
    const y = (e.clientY - rect.top - viewY) / zoom - sz.h / 2;
    addComponent(type, x, y);
  }

  function screenToCanvas(clientX, clientY) {
    const rect = wrapper.getBoundingClientRect();
    return {
      x: (clientX - rect.left - viewX) / zoom,
      y: (clientY - rect.top - viewY) / zoom
    };
  }

  function onCanvasPointerDown(e) {
    const pt = screenToCanvas(e.clientX, e.clientY);

    // Check if clicking a resize handle (for any selected component)
    if (selected.size === 1) {
      const selId = [...selected][0];
      const selComp = state.components.find(c => c.id === selId);
      if (selComp && selComp.type !== 'shape_text') {
        const handle = findResizeHandle(selComp, pt.x, pt.y);
        if (handle) {
          e.stopPropagation();
          const sz = getCompSize(selComp);
          resizing = {
            id: selComp.id, handle,
            startX: pt.x, startY: pt.y,
            startW: sz.w, startH: sz.h,
            startCompX: selComp.x, startCompY: selComp.y
          };
          canvas.setPointerCapture(e.pointerId);
          return;
        }
      }
    }

    // Check if clicking a port
    const port = findPortAt(pt.x, pt.y);
    if (port) {
      e.stopPropagation();
      if (connecting) {
        if (connecting.fromId !== port.compId) {
          const exists = state.connections.some(c =>
            (c.from === connecting.fromId && c.to === port.compId) ||
            (c.from === port.compId && c.to === connecting.fromId)
          );
          if (!exists) {
            pushUndo();
            const conn = { id: 'conn-' + nextId++, from: connecting.fromId, to: port.compId, label: '' };
            state.connections.push(conn);
            saveState();
            render();
          }
        }
        connecting = null;
        canvas.classList.remove('pg-connecting');
        tempConn.style.display = 'none';
      } else {
        connecting = { fromId: port.compId, fromPort: port.side };
        canvas.classList.add('pg-connecting');
        const comp = state.components.find(c => c.id === port.compId);
        if (comp) {
          const portPt = getPortPosition(comp, port.side);
          tempConn.setAttribute('x1', portPt.x);
          tempConn.setAttribute('y1', portPt.y);
          tempConn.setAttribute('x2', portPt.x);
          tempConn.setAttribute('y2', portPt.y);
          tempConn.style.display = '';
        }
      }
      return;
    }

    // Cancel any in-progress connection on non-port click
    // BUT if clicking a component body while connecting, connect to nearest port
    if (connecting) {
      const targetComp = findComponentAt(pt.x, pt.y);
      if (targetComp && targetComp.id !== connecting.fromId) {
        const exists = state.connections.some(c =>
          (c.from === connecting.fromId && c.to === targetComp.id) ||
          (c.from === targetComp.id && c.to === connecting.fromId)
        );
        if (!exists) {
          pushUndo();
          const conn = { id: 'conn-' + nextId++, from: connecting.fromId, to: targetComp.id, label: '' };
          state.connections.push(conn);
          saveState();
        }
      }
      connecting = null;
      canvas.classList.remove('pg-connecting');
      tempConn.style.display = 'none';
      render();
      return;
    }

    // Check if clicking near edge of a component to start connection
    const edgeComp = findComponentEdgeAt(pt.x, pt.y);
    if (edgeComp) {
      e.stopPropagation();
      const ports = getPortPositions(edgeComp);
      let nearest = ports[0], minDist = Infinity;
      for (const p of ports) {
        const d = Math.hypot(pt.x - p.x, pt.y - p.y);
        if (d < minDist) { minDist = d; nearest = p; }
      }
      connecting = { fromId: edgeComp.id, fromPort: nearest.side };
      canvas.classList.add('pg-connecting');
      tempConn.setAttribute('x1', nearest.x);
      tempConn.setAttribute('y1', nearest.y);
      tempConn.setAttribute('x2', nearest.x);
      tempConn.setAttribute('y2', nearest.y);
      tempConn.style.display = '';
      return;
    }

    // Check if clicking a component body
    const comp = findComponentAt(pt.x, pt.y);
    if (comp) {
      e.stopPropagation();
      if (e.shiftKey) {
        if (selected.has(comp.id)) {
          selected.delete(comp.id);
        } else {
          selected.add(comp.id);
        }
      } else {
        if (!selected.has(comp.id)) {
          selected.clear();
          selected.add(comp.id);
        }
      }
      selectedConn = null;
      showPropertiesForSelection();

      // Record start positions for batch move
      const startPositions = {};
      selected.forEach(id => {
        const c = state.components.find(cc => cc.id === id);
        if (c) startPositions[id] = { x: c.x, y: c.y };
      });
      dragging = {
        type: 'move', id: comp.id,
        offsetX: pt.x - comp.x, offsetY: pt.y - comp.y,
        moved: false, startPositions
      };
      canvas.setPointerCapture(e.pointerId);
      render();
      return;
    }

    // Check if clicking a connection
    const conn = findConnectionAt(pt.x, pt.y);
    if (conn) {
      e.stopPropagation();
      selected.clear();
      selectedConn = conn.id;
      showConnectionProperties(conn);
      render();
      return;
    }

    // Empty space: Ctrl/middle-button = pan, otherwise = rectangle selection
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      selected.clear();
      selectedConn = null;
      hideProperties();
      dragging = { type: 'pan', startX: e.clientX, startY: e.clientY, startVX: viewX, startVY: viewY };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
      render();
    } else {
      if (!e.shiftKey) {
        selected.clear();
        selectedConn = null;
        hideProperties();
      }
      dragging = { type: 'rectsel', startX: pt.x, startY: pt.y, currentX: pt.x, currentY: pt.y };
      canvas.setPointerCapture(e.pointerId);
      render();
    }
  }

  function onCanvasPointerMove(e) {
    const pt = screenToCanvas(e.clientX, e.clientY);

    if (connecting) {
      tempConn.setAttribute('x2', pt.x);
      tempConn.setAttribute('y2', pt.y);
    }

    // Resize handle drag
    if (resizing) {
      const comp = state.components.find(c => c.id === resizing.id);
      if (!comp) return;
      const dx = pt.x - resizing.startX;
      const dy = pt.y - resizing.startY;
      const h = resizing.handle;
      let newW = resizing.startW, newH = resizing.startH;
      let newX = resizing.startCompX, newY = resizing.startCompY;

      if (h.includes('e')) newW = Math.max(80, resizing.startW + dx);
      if (h.includes('w')) { newW = Math.max(80, resizing.startW - dx); newX = resizing.startCompX + (resizing.startW - newW); }
      if (h.includes('s')) newH = Math.max(50, resizing.startH + dy);
      if (h.includes('n')) { newH = Math.max(50, resizing.startH - dy); newY = resizing.startCompY + (resizing.startH - newH); }

      comp.width = snapPos(newW);
      comp.height = snapPos(newH);
      comp.x = snapPos(newX);
      comp.y = snapPos(newY);
      render();
      return;
    }

    if (!dragging) return;

    if (dragging.type === 'pan') {
      viewX = dragging.startVX + (e.clientX - dragging.startX);
      viewY = dragging.startVY + (e.clientY - dragging.startY);
      updateViewTransform();
      return;
    }

    if (dragging.type === 'rectsel') {
      dragging.currentX = pt.x;
      dragging.currentY = pt.y;
      updateSelectRect();
      return;
    }

    // Moving selected components (batch)
    dragging.moved = true;
    const primary = state.components.find(c => c.id === dragging.id);
    if (!primary) return;
    let newX = snapPos(pt.x - dragging.offsetX);
    let newY = snapPos(pt.y - dragging.offsetY);
    const ddx = newX - dragging.startPositions[dragging.id].x;
    const ddy = newY - dragging.startPositions[dragging.id].y;

    selected.forEach(id => {
      const c = state.components.find(cc => cc.id === id);
      if (c && dragging.startPositions[id]) {
        c.x = snapPos(dragging.startPositions[id].x + ddx);
        c.y = snapPos(dragging.startPositions[id].y + ddy);
      }
    });

    // Alignment guides (smart snap)
    const guides = calculateAlignmentGuides(primary);
    if (guides.snapDX !== 0 || guides.snapDY !== 0) {
      selected.forEach(id => {
        const c = state.components.find(cc => cc.id === id);
        if (c) { c.x += guides.snapDX; c.y += guides.snapDY; }
      });
    }
    showGuideLines(guides.lines);
    render();
  }

  function onCanvasPointerUp(e) {
    clearGuideLines();

    if (resizing) {
      pushUndo();
      saveState();
      resizing = null;
      return;
    }

    if (dragging && dragging.type === 'pan') {
      canvas.style.cursor = '';
    } else if (dragging && dragging.type === 'rectsel') {
      const x1 = Math.min(dragging.startX, dragging.currentX);
      const y1 = Math.min(dragging.startY, dragging.currentY);
      const x2 = Math.max(dragging.startX, dragging.currentX);
      const y2 = Math.max(dragging.startY, dragging.currentY);
      if (Math.abs(x2 - x1) > 3 || Math.abs(y2 - y1) > 3) {
        state.components.forEach(c => {
          const sz = getCompSize(c);
          if (c.x + sz.w > x1 && c.x < x2 && c.y + sz.h > y1 && c.y < y2) {
            selected.add(c.id);
          }
        });
        showPropertiesForSelection();
        render();
      }
      hideSelectRect();
    } else if (dragging && dragging.moved) {
      pushUndo();
      saveState();
    }
    dragging = null;
    canvas.releasePointerCapture(e.pointerId);
  }

  function updateSelectRect() {
    if (!selectRect) return;
    const x = Math.min(dragging.startX, dragging.currentX);
    const y = Math.min(dragging.startY, dragging.currentY);
    const w = Math.abs(dragging.currentX - dragging.startX);
    const h = Math.abs(dragging.currentY - dragging.startY);
    selectRect.setAttribute('x', x);
    selectRect.setAttribute('y', y);
    selectRect.setAttribute('width', w);
    selectRect.setAttribute('height', h);
    selectRect.style.display = '';
  }

  function hideSelectRect() {
    if (selectRect) selectRect.style.display = 'none';
  }

  function onCanvasWheel(e) {
    e.preventDefault();
    const rect = wrapper.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const oldZoom = zoom;
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    zoom = Math.max(0.2, Math.min(3, zoom * delta));

    viewX = mx - (mx - viewX) * (zoom / oldZoom);
    viewY = my - (my - viewY) * (zoom / oldZoom);

    updateViewTransform();
    document.getElementById('pg-zoom-label').textContent = Math.round(zoom * 100) + '%';
  }

  // ── View Transform ─────────────────────────────────────────────

  function updateViewTransform() {
    const transform = `translate(${viewX},${viewY}) scale(${zoom})`;
    compLayer.setAttribute('transform', transform);
    connLayer.setAttribute('transform', transform);
    if (groupsLayer) groupsLayer.setAttribute('transform', transform);
    if (guidesLayer) guidesLayer.setAttribute('transform', transform);
    tempConn.setAttribute('transform', transform);
    if (selectRect) selectRect.setAttribute('transform', transform);

    const grid = document.getElementById('pg-grid');
    if (grid) {
      const size = 20 * zoom;
      grid.setAttribute('width', size);
      grid.setAttribute('height', size);
      grid.setAttribute('patternTransform', `translate(${viewX % size},${viewY % size})`);
    }
  }

  // ── Resize Handles ─────────────────────────────────────────────

  function findResizeHandle(comp, x, y) {
    const sz = getCompSize(comp);
    const hSize = 6;
    if (comp.type === 'shape_group') {
      const handles = [
        { name: 'nw', x: comp.x,          y: comp.y },
        { name: 'ne', x: comp.x + sz.w,   y: comp.y },
        { name: 'sw', x: comp.x,          y: comp.y + sz.h },
        { name: 'se', x: comp.x + sz.w,   y: comp.y + sz.h },
        { name: 'n',  x: comp.x + sz.w/2, y: comp.y },
        { name: 's',  x: comp.x + sz.w/2, y: comp.y + sz.h },
        { name: 'w',  x: comp.x,          y: comp.y + sz.h/2 },
        { name: 'e',  x: comp.x + sz.w,   y: comp.y + sz.h/2 }
      ];
      for (const h of handles) {
        if (Math.abs(x - h.x) <= hSize && Math.abs(y - h.y) <= hSize) return h.name;
      }
    } else {
      if (Math.abs(x - (comp.x + sz.w)) <= hSize && Math.abs(y - (comp.y + sz.h)) <= hSize) return 'se';
    }
    return null;
  }

  // ── Hit Testing ────────────────────────────────────────────────

  function findComponentAt(x, y) {
    for (let i = state.components.length - 1; i >= 0; i--) {
      const c = state.components[i];
      const sz = getCompSize(c);
      if (c.type === 'shape_text') {
        if (x >= c.x - 10 && x <= c.x + sz.w + 10 && y >= c.y - 10 && y <= c.y + sz.h + 10) return c;
      } else {
        if (x >= c.x && x <= c.x + sz.w && y >= c.y && y <= c.y + sz.h) return c;
      }
    }
    return null;
  }

  function findComponentEdgeAt(x, y) {
    const EDGE_BAND = 15;
    for (let i = state.components.length - 1; i >= 0; i--) {
      const c = state.components[i];
      if (c.type === 'shape_text') continue;
      const sz = getCompSize(c);
      if (x >= c.x && x <= c.x + sz.w && y >= c.y && y <= c.y + sz.h) {
        if ((x - c.x < EDGE_BAND) || ((c.x + sz.w) - x < EDGE_BAND) ||
            (y - c.y < EDGE_BAND) || ((c.y + sz.h) - y < EDGE_BAND)) {
          return c;
        }
      }
    }
    return null;
  }

  function findPortAt(x, y) {
    const hitR = PORT_R + 8;
    for (const c of state.components) {
      if (c.type === 'shape_text') continue;
      const ports = getPortPositions(c);
      for (const p of ports) {
        if (Math.hypot(x - p.x, y - p.y) < hitR) {
          return { compId: c.id, side: p.side };
        }
      }
    }
    return null;
  }

  function findConnectionAt(x, y) {
    const threshold = 8;
    for (const conn of state.connections) {
      const from = state.components.find(c => c.id === conn.from);
      const to = state.components.find(c => c.id === conn.to);
      if (!from || !to) continue;
      const { fromPort, toPort } = getBestPorts(from, to);
      const style = conn.style || 'curved';
      let dist;
      if (style === 'straight') {
        dist = pointToSegmentDist(x, y, fromPort.x, fromPort.y, toPort.x, toPort.y);
      } else if (style === 'elbow') {
        const mx = (fromPort.x + toPort.x) / 2;
        dist = Math.min(
          pointToSegmentDist(x, y, fromPort.x, fromPort.y, mx, fromPort.y),
          pointToSegmentDist(x, y, mx, fromPort.y, mx, toPort.y),
          pointToSegmentDist(x, y, mx, toPort.y, toPort.x, toPort.y)
        );
      } else {
        dist = pointToBezierDist(x, y, fromPort, toPort);
      }
      if (dist < threshold) return conn;
    }
    return null;
  }

  function pointToBezierDist(px, py, p1, p2) {
    let minDist = Infinity;
    const ddx = Math.abs(p2.x - p1.x) * 0.5;
    const ddy = Math.abs(p2.y - p1.y) * 0.5;
    const offset = Math.max(ddx, ddy, 40);
    let cp1x, cp2x;
    if (p1.x < p2.x) { cp1x = p1.x + offset; cp2x = p2.x - offset; }
    else { cp1x = p1.x - offset; cp2x = p2.x + offset; }
    const cp1y = p1.y;
    const cp2y = p2.y;

    for (let t = 0; t <= 1; t += 0.05) {
      const it = 1 - t;
      const bx = it*it*it*p1.x + 3*it*it*t*cp1x + 3*it*t*t*cp2x + t*t*t*p2.x;
      const by = it*it*it*p1.y + 3*it*it*t*cp1y + 3*it*t*t*cp2y + t*t*t*p2.y;
      const d = Math.hypot(px - bx, py - by);
      if (d < minDist) minDist = d;
    }
    return minDist;
  }

  function pointToSegmentDist(px, py, x1, y1, x2, y2) {
    const ddx = x2 - x1, ddy = y2 - y1;
    const lenSq = ddx * ddx + ddy * ddy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * ddx + (py - y1) * ddy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * ddx), py - (y1 + t * ddy));
  }

  // ── Port Positions ─────────────────────────────────────────────

  function getPortPositions(comp) {
    const sz = getCompSize(comp);
    return [
      { side: 'left',   x: comp.x,            y: comp.y + sz.h / 2 },
      { side: 'right',  x: comp.x + sz.w,     y: comp.y + sz.h / 2 },
      { side: 'top',    x: comp.x + sz.w / 2, y: comp.y },
      { side: 'bottom', x: comp.x + sz.w / 2, y: comp.y + sz.h }
    ];
  }

  function getPortPosition(comp, side) {
    return getPortPositions(comp).find(p => p.side === side);
  }

  // ── Component CRUD ─────────────────────────────────────────────

  function addComponent(type, x, y) {
    pushUndo();
    let comp;
    if (isShape(type)) {
      const def = SHAPES[type];
      comp = {
        id: 'c-' + nextId++,
        type: type,
        x: snapPos(x),
        y: snapPos(y),
        label: def.label,
        notes: '',
        color: def.defaultColor,
        width: def.w,
        height: def.h
      };
      if (type === 'shape_text') comp.fontSize = 14;
    } else {
      const def = ICONS[type];
      comp = {
        id: 'c-' + nextId++,
        type: type,
        x: snapPos(x),
        y: snapPos(y),
        label: def.label,
        notes: ''
      };
    }
    state.components.push(comp);
    saveState();
    selected.clear();
    selected.add(comp.id);
    selectedConn = null;
    showPropertiesForSelection();
    render();
  }

  function deleteComponent(id) {
    pushUndo();
    state.components = state.components.filter(c => c.id !== id);
    state.connections = state.connections.filter(c => c.from !== id && c.to !== id);
    selected.delete(id);
    if (selected.size === 0) hideProperties();
    saveState();
    render();
  }

  function deleteSelected() {
    if (selected.size === 0 && !selectedConn) return;
    pushUndo();
    if (selectedConn) {
      state.connections = state.connections.filter(c => c.id !== selectedConn);
      selectedConn = null;
    }
    if (selected.size > 0) {
      const ids = new Set(selected);
      state.components = state.components.filter(c => !ids.has(c.id));
      state.connections = state.connections.filter(c => !ids.has(c.from) && !ids.has(c.to));
      selected.clear();
    }
    hideProperties();
    saveState();
    render();
  }

  function deleteConnection(id) {
    pushUndo();
    state.connections = state.connections.filter(c => c.id !== id);
    selectedConn = null;
    hideProperties();
    saveState();
    render();
  }

  // ── Selection ──────────────────────────────────────────────────

  function showPropertiesForSelection() {
    if (selected.size === 1) {
      const comp = state.components.find(c => c.id === [...selected][0]);
      if (comp) showProperties(comp);
    } else if (selected.size > 1) {
      showMultiSelectProperties();
    } else {
      hideProperties();
    }
  }

  // ── Properties Panel ───────────────────────────────────────────

  function showProperties(comp) {
    const panel = document.getElementById('pg-properties');
    const title = document.getElementById('pg-properties-title');
    const compProps = document.getElementById('pg-props-component');
    const connProps = document.getElementById('pg-props-connection');
    const labelInput = document.getElementById('pg-prop-label');
    const notesInput = document.getElementById('pg-prop-notes');
    const colorWrap = document.getElementById('pg-prop-color-wrap');
    const colorInput = document.getElementById('pg-prop-color');
    const fontWrap = document.getElementById('pg-prop-fontsize-wrap');
    const fontInput = document.getElementById('pg-prop-fontsize');
    if (!panel) return;

    title.textContent = 'Properties';
    compProps.style.display = '';
    connProps.style.display = 'none';

    labelInput.value = comp.label;
    notesInput.value = comp.notes || '';

    // Shape-specific: color picker
    if (isShape(comp.type) && comp.type !== 'shape_text') {
      colorWrap.style.display = '';
      colorInput.value = comp.color || '#E3F2FD';
      colorInput.oninput = () => {
        comp.color = colorInput.value;
        renderComponent(comp);
        saveState();
      };
    } else {
      colorWrap.style.display = 'none';
    }

    // Text-specific: font size
    if (comp.type === 'shape_text') {
      fontWrap.style.display = '';
      fontInput.value = String(comp.fontSize || 14);
      fontInput.onchange = () => {
        comp.fontSize = parseInt(fontInput.value);
        renderComponent(comp);
        saveState();
      };
    } else {
      fontWrap.style.display = 'none';
    }

    panel.style.display = '';

    labelInput.oninput = () => {
      comp.label = labelInput.value;
      renderComponent(comp);
      saveState();
    };
    notesInput.oninput = () => {
      comp.notes = notesInput.value;
      saveState();
    };
  }

  function showConnectionProperties(conn) {
    const panel = document.getElementById('pg-properties');
    const title = document.getElementById('pg-properties-title');
    const compProps = document.getElementById('pg-props-component');
    const connProps = document.getElementById('pg-props-connection');
    const connLabelInput = document.getElementById('pg-prop-conn-label');
    const connStyleInput = document.getElementById('pg-prop-conn-style');
    if (!panel) return;

    title.textContent = 'Connection';
    compProps.style.display = 'none';
    connProps.style.display = '';

    connLabelInput.value = conn.label || '';
    if (connStyleInput) connStyleInput.value = conn.style || 'curved';
    panel.style.display = '';

    connLabelInput.oninput = () => {
      conn.label = connLabelInput.value;
      renderConnections();
      saveState();
    };
    if (connStyleInput) {
      connStyleInput.onchange = () => {
        pushUndo();
        conn.style = connStyleInput.value;
        renderConnections();
        saveState();
      };
    }
  }

  function showMultiSelectProperties() {
    const panel = document.getElementById('pg-properties');
    const title = document.getElementById('pg-properties-title');
    const compProps = document.getElementById('pg-props-component');
    const connProps = document.getElementById('pg-props-connection');
    if (!panel) return;

    title.textContent = `${selected.size} Selected`;
    compProps.style.display = 'none';
    connProps.style.display = 'none';
    panel.style.display = '';
  }

  function hideProperties() {
    const panel = document.getElementById('pg-properties');
    if (panel) panel.style.display = 'none';
  }

  function bindProperties() {
    const closeBtn = document.getElementById('pg-properties-close');
    const delBtn = document.getElementById('pg-prop-delete');
    const connDelBtn = document.getElementById('pg-prop-conn-delete');
    if (closeBtn) closeBtn.onclick = () => { selected.clear(); selectedConn = null; hideProperties(); render(); };
    if (delBtn) delBtn.onclick = () => { deleteSelected(); };
    if (connDelBtn) connDelBtn.onclick = () => { if (selectedConn) deleteConnection(selectedConn); };
  }

  // ── Rendering ──────────────────────────────────────────────────

  function render() {
    renderAllComponents();
    renderConnections();
  }

  function renderAllComponents() {
    if (groupsLayer) groupsLayer.innerHTML = '';
    compLayer.innerHTML = '';

    // Render group containers first (behind everything)
    state.components.forEach(comp => {
      if (comp.type === 'shape_group') {
        const el = createComponentElement(comp);
        if (groupsLayer) groupsLayer.appendChild(el);
        else compLayer.appendChild(el);
      }
    });

    // Then all other components
    state.components.forEach(comp => {
      if (comp.type !== 'shape_group') {
        compLayer.appendChild(createComponentElement(comp));
      }
    });
  }

  function createComponentElement(comp) {
    if (isShape(comp.type)) return createShapeElement(comp);
    return createIconComponentElement(comp);
  }

  function createIconComponentElement(comp) {
    const def = ICONS[comp.type] || ICONS.lakehouse;
    const cw = comp.width || COMP_W;
    const ch = comp.height || COMP_H;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('data-id', comp.id);
    g.setAttribute('transform', `translate(${comp.x},${comp.y})`);
    g.classList.add('pg-component');
    if (selected.has(comp.id)) g.classList.add('pg-selected');

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', cw);
    bg.setAttribute('height', ch);
    bg.setAttribute('rx', '10');
    bg.setAttribute('class', 'pg-comp-bg');
    g.appendChild(bg);

    const accentColor = def.color || '#0078D4';
    const accent = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    accent.setAttribute('x', '0');
    accent.setAttribute('y', '0');
    accent.setAttribute('width', cw);
    accent.setAttribute('height', '4');
    accent.setAttribute('rx', '2');
    accent.setAttribute('fill', accentColor);
    accent.setAttribute('opacity', '0.85');
    g.appendChild(accent);

    const scaleRatio = Math.min(cw / COMP_W, ch / COMP_H);
    const actualIconSize = ICON_SIZE * scaleRatio;
    const iconScale = actualIconSize / 20;
    const iconX = (cw - actualIconSize) / 2;
    const iconY = Math.max(8, (ch - 18) / 2 - actualIconSize / 2 + 4);
    const iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    iconG.setAttribute('transform', `translate(${iconX},${iconY}) scale(${iconScale})`);
    iconG.innerHTML = def.svg;
    g.appendChild(iconG);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', cw / 2);
    label.setAttribute('y', ch - 10);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'pg-comp-label');
    label.textContent = comp.label.length > 16 ? comp.label.substring(0, 15) + '\u2026' : comp.label;
    g.appendChild(label);

    // Ports
    addPorts(g, comp);

    // Resize handle (bottom-right) when selected
    if (selected.has(comp.id)) {
      const hr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      hr.setAttribute('x', cw - 4);
      hr.setAttribute('y', ch - 4);
      hr.setAttribute('width', 8);
      hr.setAttribute('height', 8);
      hr.setAttribute('class', 'pg-resize-handle');
      g.appendChild(hr);
    }

    return g;
  }

  function createShapeElement(comp) {
    const sz = getCompSize(comp);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('data-id', comp.id);
    g.setAttribute('transform', `translate(${comp.x},${comp.y})`);
    g.classList.add('pg-component');
    if (selected.has(comp.id)) g.classList.add('pg-selected');

    const color = comp.color || '#E3F2FD';

    switch (comp.type) {
      case 'shape_rect': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('fill', color);
        r.setAttribute('class', 'pg-shape-bg');
        g.appendChild(r);
        break;
      }
      case 'shape_rounded': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('rx', '12');
        r.setAttribute('fill', color);
        r.setAttribute('class', 'pg-shape-bg');
        g.appendChild(r);
        break;
      }
      case 'shape_circle': {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        el.setAttribute('cx', sz.w / 2);
        el.setAttribute('cy', sz.h / 2);
        el.setAttribute('rx', sz.w / 2);
        el.setAttribute('ry', sz.h / 2);
        el.setAttribute('fill', color);
        el.setAttribute('class', 'pg-shape-bg');
        g.appendChild(el);
        break;
      }
      case 'shape_diamond': {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', `${sz.w/2},0 ${sz.w},${sz.h/2} ${sz.w/2},${sz.h} 0,${sz.h/2}`);
        poly.setAttribute('fill', color);
        poly.setAttribute('class', 'pg-shape-bg');
        g.appendChild(poly);
        break;
      }
      case 'shape_group': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('rx', '6');
        r.setAttribute('fill', color);
        r.setAttribute('fill-opacity', '0.3');
        r.setAttribute('class', 'pg-shape-group-bg');
        g.appendChild(r);

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '10');
        title.setAttribute('y', '18');
        title.setAttribute('class', 'pg-shape-group-title');
        title.textContent = comp.label;
        g.appendChild(title);

        // Resize handles when selected
        if (selected.has(comp.id)) {
          const handles = [
            { x: 0, y: 0 }, { x: sz.w, y: 0 },
            { x: 0, y: sz.h }, { x: sz.w, y: sz.h },
            { x: sz.w/2, y: 0 }, { x: sz.w/2, y: sz.h },
            { x: 0, y: sz.h/2 }, { x: sz.w, y: sz.h/2 }
          ];
          handles.forEach(hh => {
            const hr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            hr.setAttribute('x', hh.x - 4);
            hr.setAttribute('y', hh.y - 4);
            hr.setAttribute('width', 8);
            hr.setAttribute('height', 8);
            hr.setAttribute('class', 'pg-resize-handle');
            g.appendChild(hr);
          });
        }

        addPorts(g, comp);
        return g;
      }
      case 'shape_text': {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', '0');
        t.setAttribute('y', String(comp.fontSize || 14));
        t.setAttribute('class', 'pg-shape-text');
        t.setAttribute('font-size', comp.fontSize || 14);
        t.textContent = comp.label || 'Text';
        g.appendChild(t);
        // Text annotations: no ports, no bg label
        return g;
      }
    }

    // Label for basic shapes (rect, rounded, circle, diamond)
    if (comp.type !== 'shape_group' && comp.type !== 'shape_text') {
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', sz.w / 2);
      label.setAttribute('y', sz.h / 2 + 4);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'pg-comp-label');
      label.textContent = comp.label.length > 16 ? comp.label.substring(0, 15) + '\u2026' : comp.label;
      g.appendChild(label);
    }

    addPorts(g, comp);

    // Resize handle (bottom-right) for basic shapes when selected
    if (selected.has(comp.id)) {
      const hr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      hr.setAttribute('x', sz.w - 4);
      hr.setAttribute('y', sz.h - 4);
      hr.setAttribute('width', 8);
      hr.setAttribute('height', 8);
      hr.setAttribute('class', 'pg-resize-handle');
      g.appendChild(hr);
    }

    return g;
  }

  function addPorts(g, comp) {
    const sz = getCompSize(comp);
    const portPositions = [
      { side: 'left',   x: 0,        y: sz.h / 2 },
      { side: 'right',  x: sz.w,     y: sz.h / 2 },
      { side: 'top',    x: sz.w / 2, y: 0 },
      { side: 'bottom', x: sz.w / 2, y: sz.h }
    ];
    portPositions.forEach(p => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', PORT_R);
      circle.setAttribute('class', 'pg-port');
      circle.setAttribute('data-side', p.side);
      g.appendChild(circle);
    });
  }

  function renderComponent(comp) {
    let existing = compLayer.querySelector(`[data-id="${comp.id}"]`);
    if (!existing && groupsLayer) existing = groupsLayer.querySelector(`[data-id="${comp.id}"]`);
    if (existing) {
      const newEl = createComponentElement(comp);
      existing.replaceWith(newEl);
    }
  }

  function renderConnections() {
    connLayer.innerHTML = '';
    state.connections.forEach(conn => {
      const from = state.components.find(c => c.id === conn.from);
      const to = state.components.find(c => c.id === conn.to);
      if (!from || !to) return;

      const { fromPort, toPort } = getBestPorts(from, to);
      const style = conn.style || 'curved';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d;
      if (style === 'straight') {
        d = `M${fromPort.x},${fromPort.y} L${toPort.x},${toPort.y}`;
      } else if (style === 'elbow') {
        d = elbowPath(fromPort, toPort);
      } else {
        d = bezierPath(fromPort, toPort);
      }
      path.setAttribute('d', d);
      path.setAttribute('class', conn.id === selectedConn ? 'pg-conn pg-conn-selected' : 'pg-conn');
      path.setAttribute('marker-end', conn.id === selectedConn ? 'url(#pg-arrow-selected)' : 'url(#pg-arrow)');
      path.setAttribute('data-conn-id', conn.id);

      path.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        selected.clear();
        selectedConn = conn.id;
        showConnectionProperties(conn);
        render();
      });

      connLayer.appendChild(path);

      // Connection label
      if (conn.label) {
        const mid = style === 'elbow' ? elbowMidpoint(fromPort, toPort)
                  : style === 'straight' ? straightMidpoint(fromPort, toPort)
                  : bezierMidpoint(fromPort, toPort);
        const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lbl.setAttribute('x', mid.x);
        lbl.setAttribute('y', mid.y - 6);
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('class', 'pg-conn-label');
        lbl.textContent = conn.label;
        connLayer.appendChild(lbl);
      }
    });
  }

  function getBestPorts(from, to) {
    const fs = getCompSize(from);
    const ts = getCompSize(to);
    const fcx = from.x + fs.w / 2;
    const fcy = from.y + fs.h / 2;
    const tcx = to.x + ts.w / 2;
    const tcy = to.y + ts.h / 2;
    const dx = tcx - fcx;
    const dy = tcy - fcy;

    let fromSide, toSide;
    if (Math.abs(dx) > Math.abs(dy)) {
      fromSide = dx > 0 ? 'right' : 'left';
      toSide = dx > 0 ? 'left' : 'right';
    } else {
      fromSide = dy > 0 ? 'bottom' : 'top';
      toSide = dy > 0 ? 'top' : 'bottom';
    }

    return {
      fromPort: getPortPosition(from, fromSide),
      toPort: getPortPosition(to, toSide)
    };
  }

  function bezierPath(p1, p2) {
    const dx = Math.abs(p2.x - p1.x) * 0.5;
    const dy = Math.abs(p2.y - p1.y) * 0.5;
    const offset = Math.max(dx, dy, 40);

    let cp1x = p1.x, cp1y = p1.y, cp2x = p2.x, cp2y = p2.y;

    if (p1.x < p2.x) {
      cp1x = p1.x + offset;
      cp2x = p2.x - offset;
    } else {
      cp1x = p1.x - offset;
      cp2x = p2.x + offset;
    }

    return `M${p1.x},${p1.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  function bezierMidpoint(p1, p2) {
    const dx = Math.abs(p2.x - p1.x) * 0.5;
    const dy = Math.abs(p2.y - p1.y) * 0.5;
    const offset = Math.max(dx, dy, 40);
    let cp1x, cp2x;
    if (p1.x < p2.x) { cp1x = p1.x + offset; cp2x = p2.x - offset; }
    else { cp1x = p1.x - offset; cp2x = p2.x + offset; }
    const cp1y = p1.y;
    const cp2y = p2.y;

    const t = 0.5, it = 0.5;
    return {
      x: it*it*it*p1.x + 3*it*it*t*cp1x + 3*it*t*t*cp2x + t*t*t*p2.x,
      y: it*it*it*p1.y + 3*it*it*t*cp1y + 3*it*t*t*cp2y + t*t*t*p2.y
    };
  }

  function elbowPath(p1, p2) {
    const mx = (p1.x + p2.x) / 2;
    return `M${p1.x},${p1.y} L${mx},${p1.y} L${mx},${p2.y} L${p2.x},${p2.y}`;
  }

  function straightMidpoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  function elbowMidpoint(p1, p2) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    return { x: mx, y: my };
  }

  // ── Toolbar ────────────────────────────────────────────────────

  function bindToolbar() {
    document.getElementById('pg-undo').addEventListener('click', undo);
    document.getElementById('pg-redo').addEventListener('click', redo);
    document.getElementById('pg-zoom-in').addEventListener('click', () => setZoom(zoom * 1.2));
    document.getElementById('pg-zoom-out').addEventListener('click', () => setZoom(zoom / 1.2));
    document.getElementById('pg-zoom-fit').addEventListener('click', fitToView);
    document.getElementById('pg-clear').addEventListener('click', clearCanvas);
    const validateBtn = document.getElementById('pg-validate');
    if (validateBtn) validateBtn.addEventListener('click', validateArchitecture);
    document.getElementById('pg-export-svg').addEventListener('click', exportSVG);
    document.getElementById('pg-export-png').addEventListener('click', exportPNG);

    const snapBtn = document.getElementById('pg-snap');
    if (snapBtn) {
      snapBtn.addEventListener('click', () => {
        state.snapToGrid = !state.snapToGrid;
        snapBtn.classList.toggle('pg-btn-active', state.snapToGrid);
        saveState();
      });
    }
  }

  function setZoom(z) {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const oldZoom = zoom;
    zoom = Math.max(0.2, Math.min(3, z));
    viewX = cx - (cx - viewX) * (zoom / oldZoom);
    viewY = cy - (cy - viewY) * (zoom / oldZoom);
    updateViewTransform();
    document.getElementById('pg-zoom-label').textContent = Math.round(zoom * 100) + '%';
  }

  function fitToView() {
    if (state.components.length === 0) {
      zoom = 1; viewX = 0; viewY = 0;
      updateViewTransform();
      document.getElementById('pg-zoom-label').textContent = '100%';
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.components.forEach(c => {
      const sz = getCompSize(c);
      minX = Math.min(minX, c.x);
      minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + sz.w);
      maxY = Math.max(maxY, c.y + sz.h);
    });

    const padding = 60;
    const rect = wrapper.getBoundingClientRect();
    const contentW = maxX - minX + padding * 2;
    const contentH = maxY - minY + padding * 2;

    zoom = Math.min(rect.width / contentW, rect.height / contentH, 1.5);
    viewX = (rect.width - (maxX + minX) * zoom) / 2;
    viewY = (rect.height - (maxY + minY) * zoom) / 2;

    updateViewTransform();
    document.getElementById('pg-zoom-label').textContent = Math.round(zoom * 100) + '%';
  }

  function clearCanvas() {
    if (state.components.length === 0) return;
    if (!confirm('Clear entire canvas? This cannot be undone.')) return;
    pushUndo();
    state.components = [];
    state.connections = [];
    selected.clear();
    selectedConn = null;
    hideProperties();
    saveState();
    render();
  }

  // ── Undo / Redo ────────────────────────────────────────────────

  function pushUndo() {
    undoStack.push(JSON.stringify(state));
    if (undoStack.length > MAX_UNDO) undoStack.shift();
    redoStack = [];
    updateUndoButtons();
  }

  function undo() {
    if (undoStack.length === 0) return;
    redoStack.push(JSON.stringify(state));
    state = JSON.parse(undoStack.pop());
    selected.clear();
    selectedConn = null;
    hideProperties();
    saveState();
    render();
    updateUndoButtons();
    updateSnapButton();
  }

  function redo() {
    if (redoStack.length === 0) return;
    undoStack.push(JSON.stringify(state));
    state = JSON.parse(redoStack.pop());
    selected.clear();
    selectedConn = null;
    hideProperties();
    saveState();
    render();
    updateUndoButtons();
    updateSnapButton();
  }

  function updateUndoButtons() {
    const undoBtn = document.getElementById('pg-undo');
    const redoBtn = document.getElementById('pg-redo');
    if (undoBtn) undoBtn.disabled = undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = redoStack.length === 0;
  }

  function updateSnapButton() {
    const snapBtn = document.getElementById('pg-snap');
    if (snapBtn) snapBtn.classList.toggle('pg-btn-active', state.snapToGrid);
  }

  // ── Keyboard Shortcuts ─────────────────────────────────────────

  function bindKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        copySelected();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        pasteClipboard();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selected.size > 0) {
        e.preventDefault();
        const step = e.shiftKey ? (state.snapToGrid ? GRID_SIZE : 10) : 1;
        let dx = 0, dy = 0;
        if (e.key === 'ArrowLeft') dx = -step;
        if (e.key === 'ArrowRight') dx = step;
        if (e.key === 'ArrowUp') dy = -step;
        if (e.key === 'ArrowDown') dy = step;
        nudgeSelected(dx, dy);
      } else if (e.key === '?' || e.key === 'F1') {
        e.preventDefault();
        showShortcutHelp();
      } else if (e.key === 'Escape') {
        if (connecting) {
          connecting = null;
          canvas.classList.remove('pg-connecting');
          tempConn.style.display = 'none';
        }
        closeTemplatesDropdown();
        closeContextMenu();
        selected.clear();
        selectedConn = null;
        hideProperties();
        render();
      }
    });
  }

  // ── Export ──────────────────────────────────────────────────────

  function exportSVG() {
    const svgClone = buildExportSVG();
    const blob = new Blob([new XMLSerializer().serializeToString(svgClone)], { type: 'image/svg+xml' });
    downloadBlob(blob, 'fabric-architecture.svg');
  }

  function exportPNG() {
    const svgClone = buildExportSVG();
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const c = document.createElement('canvas');
      c.width = img.width * scale;
      c.height = img.height * scale;
      const ctx = c.getContext('2d');
      ctx.scale(scale, scale);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      c.toBlob(blob => downloadBlob(blob, 'fabric-architecture.png'), 'image/png');
    };
    img.src = url;
  }

  function buildExportSVG() {
    if (state.components.length === 0) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '400');
      svg.setAttribute('height', '200');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '200');
      text.setAttribute('y', '100');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-family', 'Segoe UI, sans-serif');
      text.setAttribute('font-size', '16');
      text.textContent = 'Empty diagram';
      svg.appendChild(text);
      return svg;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.components.forEach(c => {
      const sz = getCompSize(c);
      minX = Math.min(minX, c.x);
      minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + sz.w);
      maxY = Math.max(maxY, c.y + sz.h);
    });

    const pad = 40;
    const w = maxX - minX + pad * 2;
    const h = maxY - minY + pad * 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${w} ${h}`);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      .pg-comp-bg { fill: #ffffff; stroke: #e0e0e0; stroke-width: 1.5; }
      .pg-comp-label { font-family: 'Segoe UI', sans-serif; font-size: 11px; fill: #333; }
      .pg-conn { fill: none; stroke: #0078D4; stroke-width: 2; }
      .pg-conn-label { font-family: 'Segoe UI', sans-serif; font-size: 10px; fill: #555; }
      .pg-shape-bg { stroke: #b0b0b0; stroke-width: 1; }
      .pg-shape-group-bg { stroke: #90CAF9; stroke-width: 2; stroke-dasharray: 8 4; }
      .pg-shape-group-title { font-family: 'Segoe UI', sans-serif; font-size: 12px; fill: #555; font-weight: 600; }
      .pg-shape-text { font-family: 'Segoe UI', sans-serif; fill: #333; }
    `;
    svg.appendChild(style);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '10');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '0 0, 10 3.5, 0 7');
    poly.setAttribute('fill', '#0078D4');
    marker.appendChild(poly);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Connections
    const connG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    state.connections.forEach(conn => {
      const from = state.components.find(c => c.id === conn.from);
      const to = state.components.find(c => c.id === conn.to);
      if (!from || !to) return;
      const { fromPort, toPort } = getBestPorts(from, to);
      const connStyle = conn.style || 'curved';
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d;
      if (connStyle === 'straight') {
        d = `M${fromPort.x},${fromPort.y} L${toPort.x},${toPort.y}`;
      } else if (connStyle === 'elbow') {
        d = elbowPath(fromPort, toPort);
      } else {
        d = bezierPath(fromPort, toPort);
      }
      path.setAttribute('d', d);
      path.setAttribute('class', 'pg-conn');
      path.setAttribute('marker-end', 'url(#arrow)');
      connG.appendChild(path);

      if (conn.label) {
        const mid = connStyle === 'elbow' ? elbowMidpoint(fromPort, toPort)
                  : connStyle === 'straight' ? straightMidpoint(fromPort, toPort)
                  : bezierMidpoint(fromPort, toPort);
        const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lbl.setAttribute('x', mid.x);
        lbl.setAttribute('y', mid.y - 6);
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('class', 'pg-conn-label');
        lbl.textContent = conn.label;
        connG.appendChild(lbl);
      }
    });
    svg.appendChild(connG);

    // Components — groups first, then others
    const groups = state.components.filter(c => c.type === 'shape_group');
    const others = state.components.filter(c => c.type !== 'shape_group');
    groups.forEach(comp => { svg.appendChild(buildExportComponent(comp)); });
    others.forEach(comp => { svg.appendChild(buildExportComponent(comp)); });

    // Watermark
    const wm = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    wm.setAttribute('x', maxX + pad - 5);
    wm.setAttribute('y', maxY + pad - 5);
    wm.setAttribute('text-anchor', 'end');
    wm.setAttribute('fill', '#ccc');
    wm.setAttribute('font-family', 'Segoe UI, sans-serif');
    wm.setAttribute('font-size', '9');
    wm.textContent = 'Created with Fabric Guide \u2014 fabric.diazlabs.xyz';
    svg.appendChild(wm);

    return svg;
  }

  function buildExportComponent(comp) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${comp.x},${comp.y})`);

    if (isShape(comp.type)) {
      return buildExportShape(comp, g);
    }

    // Icon-based component
    const def = ICONS[comp.type] || ICONS.lakehouse;
    const cw = comp.width || COMP_W;
    const ch = comp.height || COMP_H;

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', cw);
    bg.setAttribute('height', ch);
    bg.setAttribute('rx', '10');
    bg.setAttribute('class', 'pg-comp-bg');
    g.appendChild(bg);

    const accentColor = def.color || '#0078D4';
    const accent = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    accent.setAttribute('width', cw);
    accent.setAttribute('height', '4');
    accent.setAttribute('rx', '2');
    accent.setAttribute('fill', accentColor);
    accent.setAttribute('opacity', '0.85');
    g.appendChild(accent);

    const scaleRatio = Math.min(cw / COMP_W, ch / COMP_H);
    const actualIconSize = ICON_SIZE * scaleRatio;
    const iconScale = actualIconSize / 20;
    const iconX = (cw - actualIconSize) / 2;
    const iconY = Math.max(8, (ch - 18) / 2 - actualIconSize / 2 + 4);
    const iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    iconG.setAttribute('transform', `translate(${iconX},${iconY}) scale(${iconScale})`);
    iconG.innerHTML = def.svg;
    g.appendChild(iconG);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', cw / 2);
    label.setAttribute('y', ch - 10);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'pg-comp-label');
    label.textContent = comp.label;
    g.appendChild(label);

    return g;
  }

  function buildExportShape(comp, g) {
    const sz = getCompSize(comp);
    const color = comp.color || '#E3F2FD';

    switch (comp.type) {
      case 'shape_rect': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('fill', color);
        r.setAttribute('class', 'pg-shape-bg');
        g.appendChild(r);
        break;
      }
      case 'shape_rounded': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('rx', '12');
        r.setAttribute('fill', color);
        r.setAttribute('class', 'pg-shape-bg');
        g.appendChild(r);
        break;
      }
      case 'shape_circle': {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        el.setAttribute('cx', sz.w / 2);
        el.setAttribute('cy', sz.h / 2);
        el.setAttribute('rx', sz.w / 2);
        el.setAttribute('ry', sz.h / 2);
        el.setAttribute('fill', color);
        el.setAttribute('class', 'pg-shape-bg');
        g.appendChild(el);
        break;
      }
      case 'shape_diamond': {
        const pp = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        pp.setAttribute('points', `${sz.w/2},0 ${sz.w},${sz.h/2} ${sz.w/2},${sz.h} 0,${sz.h/2}`);
        pp.setAttribute('fill', color);
        pp.setAttribute('class', 'pg-shape-bg');
        g.appendChild(pp);
        break;
      }
      case 'shape_group': {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('width', sz.w);
        r.setAttribute('height', sz.h);
        r.setAttribute('rx', '6');
        r.setAttribute('fill', color);
        r.setAttribute('fill-opacity', '0.3');
        r.setAttribute('class', 'pg-shape-group-bg');
        g.appendChild(r);
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '10');
        title.setAttribute('y', '18');
        title.setAttribute('class', 'pg-shape-group-title');
        title.textContent = comp.label;
        g.appendChild(title);
        return g;
      }
      case 'shape_text': {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', '0');
        t.setAttribute('y', String(comp.fontSize || 14));
        t.setAttribute('class', 'pg-shape-text');
        t.setAttribute('font-size', comp.fontSize || 14);
        t.textContent = comp.label || 'Text';
        g.appendChild(t);
        return g;
      }
    }

    // Label for basic shapes
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', sz.w / 2);
    label.setAttribute('y', sz.h / 2 + 4);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'pg-comp-label');
    label.textContent = comp.label;
    g.appendChild(label);

    return g;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── localStorage Persistence ───────────────────────────────────

  const STORAGE_KEY = 'fabric-playground-state';

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateNextId();
    } catch (e) { /* quota exceeded */ }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: ensure new properties exist
        state.components = parsed.components || [];
        state.connections = (parsed.connections || []).map(c => ({
          ...c,
          label: c.label != null ? c.label : '',
          style: c.style || 'curved'
        }));
        state.snapToGrid = parsed.snapToGrid || false;
        updateNextId();
        updateSnapButton();
      }
    } catch (e) { /* corrupt — start fresh */ }
  }

  function updateNextId() {
    state.components.forEach(c => {
      const num = parseInt(c.id.replace('c-', ''));
      if (num >= nextId) nextId = num + 1;
    });
    state.connections.forEach(c => {
      const num = parseInt(c.id.replace('conn-', ''));
      if (num >= nextId) nextId = num + 1;
    });
  }

  // ── Templates ───────────────────────────────────────────────────

  const TEMPLATES = {
    medallion: {
      name: 'Medallion Lakehouse',
      components: [
        { type: 'data_factory',   x: 80,  y: 180, label: 'Data Factory' },
        { type: 'lakehouse',      x: 320, y: 60,  label: 'Bronze Layer' },
        { type: 'lakehouse',      x: 320, y: 180, label: 'Silver Layer' },
        { type: 'lakehouse',      x: 320, y: 300, label: 'Gold Layer' },
        { type: 'notebook',       x: 560, y: 120, label: 'Transform' },
        { type: 'semantic_model', x: 560, y: 300, label: 'Semantic Model' },
        { type: 'report',         x: 800, y: 180, label: 'Power BI Report' },
        { type: 'shape_group',    x: 260, y: 20,  label: 'OneLake (Medallion)', width: 240, height: 360, color: '#E3F2FD' }
      ],
      connections: [
        ['Data Factory', 'Bronze Layer'],
        ['Bronze Layer', 'Transform'],
        ['Transform', 'Silver Layer'],
        ['Silver Layer', 'Gold Layer'],
        ['Gold Layer', 'Semantic Model'],
        ['Semantic Model', 'Power BI Report']
      ]
    },
    realtime: {
      name: 'Real-Time Pipeline',
      components: [
        { type: 'eventstream',  x: 80,  y: 180, label: 'Event Stream' },
        { type: 'eventhouse',   x: 320, y: 80,  label: 'Eventhouse' },
        { type: 'kql_database', x: 320, y: 280, label: 'KQL Database' },
        { type: 'notebook',     x: 560, y: 80,  label: 'ML Scoring' },
        { type: 'report',       x: 560, y: 280, label: 'Real-Time Dashboard' },
        { type: 'shape_group',  x: 260, y: 40,  label: 'Real-Time Intelligence', width: 240, height: 300, color: '#E3F2FD' }
      ],
      connections: [
        ['Event Stream', 'Eventhouse'],
        ['Event Stream', 'KQL Database'],
        ['Eventhouse', 'ML Scoring'],
        ['KQL Database', 'Real-Time Dashboard']
      ]
    },
    datamesh: {
      name: 'Data Mesh',
      components: [
        { type: 'shape_group',    x: 40,  y: 40,  label: 'Sales Domain',       width: 280, height: 240, color: '#E3F2FD' },
        { type: 'shape_group',    x: 400, y: 40,  label: 'Marketing Domain',   width: 280, height: 240, color: '#E3F2FD' },
        { type: 'lakehouse',      x: 100, y: 100, label: 'Sales Lakehouse' },
        { type: 'warehouse',      x: 100, y: 200, label: 'Sales Warehouse' },
        { type: 'lakehouse',      x: 460, y: 100, label: 'Marketing Lakehouse' },
        { type: 'semantic_model', x: 460, y: 200, label: 'Marketing Model' },
        { type: 'shape_group',    x: 220, y: 340, label: 'Shared / Governance', width: 280, height: 120, color: '#E3F2FD' },
        { type: 'workspace',      x: 280, y: 380, label: 'Purview Governance' },
        { type: 'fabric',         x: 440, y: 380, label: 'OneLake Hub' }
      ],
      connections: [
        ['Sales Lakehouse', 'Sales Warehouse'],
        ['Marketing Lakehouse', 'Marketing Model'],
        ['Sales Warehouse', 'OneLake Hub'],
        ['Marketing Model', 'OneLake Hub']
      ]
    },
    enterprise: {
      name: 'Enterprise Analytics',
      components: [
        { type: 'azure_sql',      x: 80,  y: 80,  label: 'Azure SQL' },
        { type: 'sql_server',     x: 80,  y: 200, label: 'On-Prem SQL' },
        { type: 'rest_api',       x: 80,  y: 320, label: 'REST API' },
        { type: 'data_factory',   x: 300, y: 200, label: 'Data Factory' },
        { type: 'lakehouse',      x: 520, y: 120, label: 'Lakehouse' },
        { type: 'warehouse',      x: 520, y: 280, label: 'Warehouse' },
        { type: 'semantic_model', x: 740, y: 200, label: 'Semantic Model' },
        { type: 'report',         x: 940, y: 120, label: 'Executive Report' },
        { type: 'dashboard_pbi',  x: 940, y: 280, label: 'Dashboard' }
      ],
      connections: [
        ['Azure SQL', 'Data Factory'],
        ['On-Prem SQL', 'Data Factory'],
        ['REST API', 'Data Factory'],
        ['Data Factory', 'Lakehouse'],
        ['Data Factory', 'Warehouse'],
        ['Lakehouse', 'Semantic Model'],
        ['Warehouse', 'Semantic Model'],
        ['Semantic Model', 'Executive Report'],
        ['Semantic Model', 'Dashboard']
      ]
    }
  };

  function loadTemplate(templateKey) {
    const tpl = TEMPLATES[templateKey];
    if (!tpl) return;
    if (state.components.length > 0 && !confirm('This will replace the current canvas. Continue?')) return;

    pushUndo();
    state.components = [];
    state.connections = [];
    selected.clear();
    selectedConn = null;
    hideProperties();

    // Create components
    tpl.components.forEach(def => {
      const comp = {
        id: 'c-' + nextId++,
        type: def.type,
        x: def.x,
        y: def.y,
        label: def.label,
        notes: ''
      };
      if (isShape(def.type)) {
        const shapeDef = SHAPES[def.type];
        comp.color = def.color || (shapeDef ? shapeDef.defaultColor : '#E3F2FD');
        comp.width = def.width || (shapeDef ? shapeDef.w : 120);
        comp.height = def.height || (shapeDef ? shapeDef.h : 72);
        if (def.type === 'shape_text') comp.fontSize = def.fontSize || 14;
      }
      state.components.push(comp);
    });

    // Create connections by label lookup
    tpl.connections.forEach(([fromLabel, toLabel]) => {
      const from = state.components.find(c => c.label === fromLabel);
      const to = state.components.find(c => c.label === toLabel);
      if (from && to) {
        state.connections.push({ id: 'conn-' + nextId++, from: from.id, to: to.id, label: '' });
      }
    });

    saveState();
    render();
    fitToView();
    closeTemplatesDropdown();
  }

  function bindTemplates() {
    const btn = document.getElementById('pg-templates');
    const dropdown = document.getElementById('pg-templates-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.style.display !== 'none';
      dropdown.style.display = isOpen ? 'none' : '';
    });

    dropdown.querySelectorAll('.pg-template-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        loadTemplate(item.dataset.template);
      });
    });

    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('pg-templates-wrap');
      if (wrap && !wrap.contains(e.target)) {
        closeTemplatesDropdown();
      }
    });
  }

  function closeTemplatesDropdown() {
    const dropdown = document.getElementById('pg-templates-dropdown');
    if (dropdown) dropdown.style.display = 'none';
  }

  // ── Copy / Paste / Duplicate ───────────────────────────────────

  function copySelected() {
    if (selected.size === 0) return;
    clipboard = [];
    selected.forEach(id => {
      const comp = state.components.find(c => c.id === id);
      if (comp) clipboard.push(JSON.parse(JSON.stringify(comp)));
    });
  }

  function pasteClipboard() {
    if (clipboard.length === 0) return;
    pushUndo();

    const newIds = new Map();
    const pasted = [];
    clipboard.forEach(orig => {
      const newComp = JSON.parse(JSON.stringify(orig));
      const newId = 'c-' + nextId++;
      newIds.set(orig.id, newId);
      newComp.id = newId;
      newComp.x += 20;
      newComp.y += 20;
      state.components.push(newComp);
      pasted.push(newComp);
    });

    // Update clipboard positions so repeated pastes cascade
    clipboard.forEach(c => { c.x += 20; c.y += 20; });

    selected.clear();
    pasted.forEach(c => selected.add(c.id));
    selectedConn = null;
    showPropertiesForSelection();
    saveState();
    render();
  }

  function duplicateSelected() {
    copySelected();
    pasteClipboard();
  }

  // ── Import / Export JSON ───────────────────────────────────────

  function exportJSON() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    downloadBlob(blob, 'fabric-architecture.json');
  }

  function importJSON() {
    const input = document.getElementById('pg-import-file');
    if (!input) return;
    input.value = '';
    input.click();
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data.components) || !Array.isArray(data.connections)) {
          alert('Invalid file: expected { components: [...], connections: [...] }');
          return;
        }
        if (!confirm('This will replace the current canvas. Continue?')) return;

        pushUndo();
        state.components = data.components;
        state.connections = (data.connections || []).map(c => ({
          ...c,
          label: c.label != null ? c.label : '',
          style: c.style || 'curved'
        }));
        state.snapToGrid = data.snapToGrid || false;
        updateNextId();
        updateSnapButton();
        selected.clear();
        selectedConn = null;
        hideProperties();
        saveState();
        render();
        fitToView();
      } catch (err) {
        alert('Failed to parse JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function bindImportExport() {
    const importBtn = document.getElementById('pg-import-json');
    const exportBtn = document.getElementById('pg-export-json');
    const fileInput = document.getElementById('pg-import-file');
    if (importBtn) importBtn.addEventListener('click', importJSON);
    if (exportBtn) exportBtn.addEventListener('click', exportJSON);
    if (fileInput) fileInput.addEventListener('change', handleImportFile);
  }

  // ── Double-Click Inline Edit ─────────────────────────────────

  function onCanvasDblClick(e) {
    const pt = screenToCanvas(e.clientX, e.clientY);
    const comp = findComponentAt(pt.x, pt.y);
    if (!comp) return;
    e.preventDefault();
    startInlineEdit(comp);
  }

  function startInlineEdit(comp) {
    const existing = document.querySelector('.pg-inline-edit');
    if (existing) existing.remove();

    const sz = getCompSize(comp);
    const wrapperRect = wrapper.getBoundingClientRect();

    let labelX, labelY;
    if (comp.type === 'shape_group') {
      labelX = comp.x + 10 + 40;
      labelY = comp.y + 10;
    } else if (comp.type === 'shape_text') {
      labelX = comp.x + 50;
      labelY = comp.y;
    } else if (isShape(comp.type)) {
      labelX = comp.x + sz.w / 2;
      labelY = comp.y + sz.h / 2;
    } else {
      labelX = comp.x + sz.w / 2;
      labelY = comp.y + sz.h - 16;
    }

    const screenX = labelX * zoom + viewX + wrapperRect.left;
    const screenY = labelY * zoom + viewY + wrapperRect.top;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'pg-inline-edit';
    input.value = comp.label;
    input.style.left = (screenX - 65) + 'px';
    input.style.top = (screenY - 10) + 'px';

    document.body.appendChild(input);
    input.focus();
    input.select();

    let committed = false;
    function commit() {
      if (committed) return;
      committed = true;
      if (input.parentNode) {
        pushUndo();
        comp.label = input.value || comp.label;
        input.remove();
        saveState();
        render();
        const labelInput = document.getElementById('pg-prop-label');
        if (labelInput && selected.has(comp.id)) labelInput.value = comp.label;
      }
    }
    function cancel() {
      committed = true;
      if (input.parentNode) input.remove();
    }

    input.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') { ev.preventDefault(); commit(); }
      if (ev.key === 'Escape') { ev.preventDefault(); cancel(); }
      ev.stopPropagation();
    });
    input.addEventListener('blur', commit);
  }

  // ── Context Menu ──────────────────────────────────────────────

  function onContextMenu(e) {
    e.preventDefault();
    closeContextMenu();

    const pt = screenToCanvas(e.clientX, e.clientY);
    const comp = findComponentAt(pt.x, pt.y);
    const conn = findConnectionAt(pt.x, pt.y);

    const menu = document.createElement('div');
    menu.className = 'pg-context-menu';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';

    if (comp) {
      addMenuItem(menu, 'Edit Label', () => startInlineEdit(comp));
      addMenuItem(menu, 'Duplicate', () => { selected.clear(); selected.add(comp.id); duplicateSelected(); });
      addMenuItem(menu, 'Delete', () => deleteComponent(comp.id));
      addMenuSep(menu);
      addMenuItem(menu, 'Bring to Front', () => bringToFront(comp.id));
      addMenuItem(menu, 'Send to Back', () => sendToBack(comp.id));

      const guideUrl = GUIDE_PAGE_MAP[comp.type];
      if (guideUrl) {
        addMenuSep(menu);
        addMenuItem(menu, 'Learn more \u2192', () => window.open(guideUrl, '_blank'));
      }
    } else if (conn) {
      addMenuItem(menu, 'Add Label', () => {
        selectedConn = conn.id;
        selected.clear();
        showConnectionProperties(conn);
        render();
      });
      addMenuItem(menu, 'Delete Connection', () => deleteConnection(conn.id));
    } else {
      if (clipboard.length > 0) {
        addMenuItem(menu, 'Paste', pasteClipboard);
      }
      addMenuItem(menu, 'Fit to View', fitToView);
      addMenuItem(menu, 'Clear Canvas', clearCanvas);
    }

    document.body.appendChild(menu);

    const menuRect = menu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) menu.style.left = (e.clientX - menuRect.width) + 'px';
    if (menuRect.bottom > window.innerHeight) menu.style.top = (e.clientY - menuRect.height) + 'px';

    setTimeout(() => {
      document.addEventListener('click', closeContextMenu, { once: true });
      document.addEventListener('contextmenu', function handler(ev) {
        if (!menu.contains(ev.target)) closeContextMenu();
        document.removeEventListener('contextmenu', handler);
      });
    });
  }

  function addMenuItem(menu, label, action) {
    const btn = document.createElement('button');
    btn.className = 'pg-context-item';
    btn.textContent = label;
    btn.addEventListener('click', (e) => { e.stopPropagation(); closeContextMenu(); action(); });
    menu.appendChild(btn);
  }

  function addMenuSep(menu) {
    const sep = document.createElement('div');
    sep.className = 'pg-context-sep';
    menu.appendChild(sep);
  }

  function closeContextMenu() {
    const existing = document.querySelector('.pg-context-menu');
    if (existing) existing.remove();
  }

  function bringToFront(id) {
    const idx = state.components.findIndex(c => c.id === id);
    if (idx < 0) return;
    pushUndo();
    const [comp] = state.components.splice(idx, 1);
    state.components.push(comp);
    saveState();
    render();
  }

  function sendToBack(id) {
    const idx = state.components.findIndex(c => c.id === id);
    if (idx < 0) return;
    pushUndo();
    const [comp] = state.components.splice(idx, 1);
    state.components.unshift(comp);
    saveState();
    render();
  }

  // ── Arrow Key Nudge ───────────────────────────────────────────

  function nudgeSelected(dx, dy) {
    if (!nudgeUndoPushed) {
      pushUndo();
      nudgeUndoPushed = true;
    }
    selected.forEach(id => {
      const c = state.components.find(cc => cc.id === id);
      if (c) { c.x += dx; c.y += dy; }
    });
    render();

    if (nudgeUndoTimer) clearTimeout(nudgeUndoTimer);
    nudgeUndoTimer = setTimeout(() => {
      saveState();
      nudgeUndoPushed = false;
      nudgeUndoTimer = null;
    }, 500);
  }

  // ── Keyboard Shortcut Help ────────────────────────────────────

  function showShortcutHelp() {
    if (document.querySelector('.pg-shortcut-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'pg-shortcut-overlay';
    overlay.innerHTML = `
      <div class="pg-shortcut-modal">
        <div class="pg-shortcut-header">
          <span>Keyboard Shortcuts</span>
          <button class="pg-shortcut-close">&times;</button>
        </div>
        <div class="pg-shortcut-body">
          <div class="pg-shortcut-row"><kbd>Ctrl+Z</kbd><span>Undo</span></div>
          <div class="pg-shortcut-row"><kbd>Ctrl+Y</kbd><span>Redo</span></div>
          <div class="pg-shortcut-row"><kbd>Ctrl+C</kbd><span>Copy</span></div>
          <div class="pg-shortcut-row"><kbd>Ctrl+V</kbd><span>Paste</span></div>
          <div class="pg-shortcut-row"><kbd>Ctrl+D</kbd><span>Duplicate</span></div>
          <div class="pg-shortcut-row"><kbd>Del / Backspace</kbd><span>Delete selected</span></div>
          <div class="pg-shortcut-row"><kbd>Arrow keys</kbd><span>Nudge 1px</span></div>
          <div class="pg-shortcut-row"><kbd>Shift+Arrow</kbd><span>Nudge 10px</span></div>
          <div class="pg-shortcut-row"><kbd>Escape</kbd><span>Cancel / Deselect</span></div>
          <div class="pg-shortcut-row"><kbd>Ctrl+Drag</kbd><span>Pan canvas</span></div>
          <div class="pg-shortcut-row"><kbd>Scroll wheel</kbd><span>Zoom</span></div>
          <div class="pg-shortcut-row"><kbd>Double-click</kbd><span>Edit label</span></div>
          <div class="pg-shortcut-row"><kbd>Right-click</kbd><span>Context menu</span></div>
          <div class="pg-shortcut-row"><kbd>?</kbd><span>Show this help</span></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('.pg-shortcut-close').addEventListener('click', close);
    overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(); });
    document.addEventListener('keydown', function onKey(ev) {
      if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });
  }

  // ── Alignment Guides ──────────────────────────────────────────

  function calculateAlignmentGuides(primary) {
    const THRESHOLD = 3;
    const sz = getCompSize(primary);
    const edges = {
      left: primary.x, right: primary.x + sz.w,
      top: primary.y, bottom: primary.y + sz.h,
      cx: primary.x + sz.w / 2, cy: primary.y + sz.h / 2
    };

    let snapDX = 0, snapDY = 0;
    let bestDX = THRESHOLD + 1, bestDY = THRESHOLD + 1;
    const lines = [];

    state.components.forEach(other => {
      if (selected.has(other.id)) return;
      const os = getCompSize(other);
      const oe = {
        left: other.x, right: other.x + os.w,
        top: other.y, bottom: other.y + os.h,
        cx: other.x + os.w / 2, cy: other.y + os.h / 2
      };

      // X-axis alignment checks
      const xChecks = [
        oe.left - edges.left, oe.right - edges.right,
        oe.left - edges.right, oe.right - edges.left,
        oe.cx - edges.cx
      ];
      xChecks.forEach(d => {
        if (Math.abs(d) <= THRESHOLD && Math.abs(d) < bestDX) {
          bestDX = Math.abs(d);
          snapDX = d;
        }
      });

      // Y-axis alignment checks
      const yChecks = [
        oe.top - edges.top, oe.bottom - edges.bottom,
        oe.top - edges.bottom, oe.bottom - edges.top,
        oe.cy - edges.cy
      ];
      yChecks.forEach(d => {
        if (Math.abs(d) <= THRESHOLD && Math.abs(d) < bestDY) {
          bestDY = Math.abs(d);
          snapDY = d;
        }
      });
    });

    // Collect guide lines at snapped positions
    const se = {
      left: edges.left + snapDX, right: edges.right + snapDX,
      top: edges.top + snapDY, bottom: edges.bottom + snapDY,
      cx: edges.cx + snapDX, cy: edges.cy + snapDY
    };

    state.components.forEach(other => {
      if (selected.has(other.id)) return;
      const os = getCompSize(other);
      const oe = {
        left: other.x, right: other.x + os.w,
        top: other.y, bottom: other.y + os.h,
        cx: other.x + os.w / 2, cy: other.y + os.h / 2
      };

      // Vertical guide lines (matching X coordinates)
      [se.left, se.right, se.cx].forEach(sx => {
        [oe.left, oe.right, oe.cx].forEach(ox => {
          if (Math.abs(sx - ox) < 1) {
            lines.push({ type: 'v', x: ox,
              y1: Math.min(se.top, oe.top) - 10,
              y2: Math.max(se.bottom, oe.bottom) + 10
            });
          }
        });
      });

      // Horizontal guide lines (matching Y coordinates)
      [se.top, se.bottom, se.cy].forEach(sy => {
        [oe.top, oe.bottom, oe.cy].forEach(oy => {
          if (Math.abs(sy - oy) < 1) {
            lines.push({ type: 'h', y: oy,
              x1: Math.min(se.left, oe.left) - 10,
              x2: Math.max(se.right, oe.right) + 10
            });
          }
        });
      });
    });

    return { snapDX, snapDY, lines };
  }

  function showGuideLines(lines) {
    if (!guidesLayer) return;
    guidesLayer.innerHTML = '';
    lines.forEach(l => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      if (l.type === 'v') {
        line.setAttribute('x1', l.x);
        line.setAttribute('y1', l.y1);
        line.setAttribute('x2', l.x);
        line.setAttribute('y2', l.y2);
      } else {
        line.setAttribute('x1', l.x1);
        line.setAttribute('y1', l.y);
        line.setAttribute('x2', l.x2);
        line.setAttribute('y2', l.y);
      }
      line.setAttribute('class', 'pg-guide-line');
      guidesLayer.appendChild(line);
    });
  }

  function clearGuideLines() {
    if (guidesLayer) guidesLayer.innerHTML = '';
  }

  // ── Architecture Validation ───────────────────────────────────

  function validateArchitecture() {
    const warnings = [];

    // Check: Report/Dashboard connected directly to Lakehouse/Warehouse without Semantic Model
    const reports = state.components.filter(c => c.type === 'report' || c.type === 'dashboard_pbi');
    reports.forEach(report => {
      const sources = state.connections
        .filter(conn => conn.to === report.id)
        .map(conn => state.components.find(c => c.id === conn.from))
        .filter(Boolean);

      sources.forEach(src => {
        if (src.type === 'lakehouse' || src.type === 'warehouse') {
          warnings.push({
            type: 'warning',
            message: `Reports should connect through a Semantic Model for optimal performance (Direct Lake mode) \u2014 "${report.label}" connects directly to "${src.label}"`
          });
        }
      });
    });

    // Check: Orphaned components
    state.components.forEach(comp => {
      if (isShape(comp.type)) return;
      const hasConn = state.connections.some(c => c.from === comp.id || c.to === comp.id);
      if (!hasConn) {
        warnings.push({
          type: 'info',
          message: `Component "${comp.label}" has no connections`
        });
      }
    });

    // Check: Missing governance
    const nonShapeCount = state.components.filter(c => !isShape(c.type)).length;
    if (nonShapeCount >= 5) {
      const hasWorkspace = state.components.some(c => c.type === 'workspace');
      if (!hasWorkspace) {
        warnings.push({
          type: 'info',
          message: 'Consider adding Workspace boundaries for governance'
        });
      }
    }

    showValidationResults(warnings);
  }

  function showValidationResults(warnings) {
    const existing = document.querySelector('.pg-validation-panel');
    if (existing) existing.remove();

    if (warnings.length === 0) {
      const panel = document.createElement('div');
      panel.className = 'pg-validation-panel';
      panel.innerHTML = '<div class="pg-validation-success">\u2713 No issues found \u2014 architecture looks good!</div><button class="pg-validation-close">&times;</button>';
      panel.querySelector('.pg-validation-close').addEventListener('click', () => panel.remove());
      document.querySelector('.pg-toolbar').after(panel);
      setTimeout(() => { if (panel.parentNode) panel.remove(); }, 4000);
      return;
    }

    const panel = document.createElement('div');
    panel.className = 'pg-validation-panel';
    let html = '<button class="pg-validation-close">&times;</button>';
    warnings.forEach(w => {
      const cls = w.type === 'warning' ? 'pg-validation-warning' : 'pg-validation-info';
      html += `<div class="${cls}">${w.message}</div>`;
    });
    panel.innerHTML = html;
    panel.querySelector('.pg-validation-close').addEventListener('click', () => panel.remove());
    document.querySelector('.pg-toolbar').after(panel);
  }

  // ── Boot ───────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
