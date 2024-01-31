import clsx from "clsx";
import React, { useState, useEffect } from "react";
import styles from "./ArboristTest.module.scss";
import { week } from "./WeekData";
import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FillFlexParent } from "components/fill-flex-parent";
import { r } from "msw/lib/glossary-58eca5a8";

type Data = {
  id: string;
  name: string;
  type: string;
  children?: Data[];
};

const INDENT_STEP = 15;

function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
  // const Icon = node.isInternal ? BsMapFill : BsGeoFill;  not used
  const indentSize = Number.parseFloat(`${style.paddingLeft || 0}`);

  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx(styles.node, node.state)}
      onClick={() => node.isInternal && node.toggle()}
    >
      <div className={styles.indentLines}>
        {new Array(indentSize / INDENT_STEP).fill(0).map((_, index) => {
          return <div key={index}></div>;
        })}
      </div>
      <ParentIcon node={node} />
      {/* <Icon className={styles.icon} />{" "} */}
      <span className={styles.text}>
        {node.isEditing ? <Input node={node} /> : node.data.name}
      </span>
    </div>
  );
}

function Input({ node }: { node: NodeApi<Data> }) {
  return (
    <input
      autoFocus
      name="name"
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => node.reset()}
      onKeyDown={(e) => {
        if (e.key === "Escape") node.reset();
        if (e.key === "Enter") node.submit(e.currentTarget.value);
      }}
    />
  );
}

// currently not used
// function sortData(data: Data[]) {
//   function sortIt(data: Data[]) {
//     data.sort((a, b) => (a.name < b.name ? -1 : 1));
//     data.forEach((d) => {
//       if (d.children) sortIt(d.children);
//     });
//     return data;
//   }
//   return sortIt(data);
// }

function ParentIcon({ node }: { node: NodeApi<Data> }) {
  return (
    <span className={styles.parentIcon}>
      {node.isInternal ? (
        node.isOpen ? (
          <IoMdArrowDropdown />
        ) : (
          <IoMdArrowDropright />
        )
      ) : null}
    </span>
  );
}

export default function ArboristTest() {
  const [tree, setTree] = useState<TreeApi<Data> | null | undefined>(null);
  const [active, setActive] = useState<Data | null>(null);
  const [focused, setFocused] = useState<Data | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);
  const [followsFocus, setFollowsFocus] = useState(true);
  const [disableMulti, setDisableMulti] = useState(false);

  useEffect(() => {
    setCount(tree?.visibleNodes.length ?? 0);
  }, [tree, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <h2>React Arborist Testing</h2>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.treeContainer}>
            <FillFlexParent>
              {(dimens) => (
                <Tree
                  {...dimens}
                  initialData={week}
                  selectionFollowsFocus={followsFocus}
                  disableMultiSelection={disableMulti}
                  ref={(t) => setTree(t)}
                  openByDefault={true}
                  searchTerm={searchTerm}
                  selection={active?.id}
                  className={styles.tree}
                  rowClassName={styles.row}
                  padding={15}
                  rowHeight={30}
                  indent={INDENT_STEP}
                  overscanCount={8}
                  onSelect={(selected) => setSelectedCount(selected.length)}
                  onActivate={(node) => setActive(node.data)}
                  onScroll={(e) => console.log("scrolling", e)}
                  onFocus={(node) => setFocused(node.data)}
                  onToggle={() => {
                    setTimeout(() => {
                      setCount(tree?.visibleNodes.length ?? 0);
                    });
                  }}
                  disableDrop={({ parentNode, dragNodes }) => {
                    // console.log('parentNode', parentNode.data.type);
                    // console.log('dragNode', dragNodes[0].data.type);
                    const thisDragNodeType = dragNodes[0].data.type;

                    // Disallow dragging of 'Day' and 'Unassigned' nodes
                    if (
                      thisDragNodeType === "Day" ||
                      thisDragNodeType === "Unassigned"
                    ) {
                      return true;
                    }

                    // If dragging a 'Member', only allow dropping under a 'Job' or 'Unassigned'
                    if (
                      thisDragNodeType === "Member" &&
                      (parentNode.data.type === "Member" ||
                        parentNode.data.type === "Day")
                    ) {
                      return true;
                    }

                    // If dragging a 'Job', disallow dropping under a 'Member' or 'Unassigned'
                    if (
                      thisDragNodeType === "Job" &&
                      (parentNode.data.type === "Member" ||
                        parentNode.data.type === "Unassigned" ||
                        parentNode.data.type === "Job")
                    ) {
                      return true;
                    }

                    return false;
                  }}
                >
                  {Node}
                </Tree>
              )}
            </FillFlexParent>
          </div>

          <div className={styles.contentContainer}>
            <p>Focused: {focused?.name ?? "(none)"}</p>
            <p>Active: {active?.name ?? "(none)"}</p>
            <p>Selected Items: {selectedCount}</p>
            <p>Visible Nodes: {count}</p>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
            <input
              type="checkbox"
              checked={followsFocus}
              onChange={(e) => setFollowsFocus((v) => !v)}
            />
            <label htmlFor="">follows focus</label>
            <input
              type="checkbox"
              checked={disableMulti}
              onChange={(e) => setDisableMulti((v) => !v)}
            />
            <label htmlFor="">disble multiselect</label>
            <button onClick={() => tree?.selectAll()}>Select All</button>
            <button onClick={() => tree?.deselectAll()}>Select None</button>
            <button onClick={() => tree?.openAll()}>Open All</button>
            <button onClick={() => tree?.closeAll()}>Close All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////
// EVERYTHING FROM HERE DOWN IS FROM THE REACT-ARBORIST DEMO:

// import clsx from "clsx";
// import { useEffect, useRef, useState } from "react";
// import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
// import styles from "../styles/cities.module.css";
// import { cities } from "../data/cities";
// import { BsMapFill, BsMap, BsGeo, BsGeoFill } from "react-icons/bs";
// import { FillFlexParent } from "../components/fill-flex-parent";
// import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
// import Link from "next/link";

// type Data = { id: string; name: string; children?: Data[] };

// const data = sortData(cities);
// const INDENT_STEP = 15;

// export default function Cities() {
//   const [tree, setTree] = useState<TreeApi<Data> | null | undefined>(null);
//   const [active, setActive] = useState<Data | null>(null);
//   const [focused, setFocused] = useState<Data | null>(null);
//   const [selectedCount, setSelectedCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [count, setCount] = useState(0);
//   const [followsFocus, setFollowsFocus] = useState(false);
//   const [disableMulti, setDisableMulti] = useState(false);

//   useEffect(() => {
//     setCount(tree?.visibleNodes.length ?? 0);
//   }, [tree, searchTerm]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.split}>
//         <div className={styles.treeContainer}>
//           <FillFlexParent>
//             {(dimens) => (
//               <Tree
//                 {...dimens}
//                 initialData={data}
//                 selectionFollowsFocus={followsFocus}
//                 disableMultiSelection={disableMulti}
//                 ref={(t) => setTree(t)}
//                 openByDefault={true}
//                 searchTerm={searchTerm}
//                 selection={active?.id}
//                 className={styles.tree}
//                 rowClassName={styles.row}
//                 padding={15}
//                 rowHeight={30}
//                 indent={INDENT_STEP}
//                 overscanCount={8}
//                 onSelect={(selected) => setSelectedCount(selected.length)}
//                 onActivate={(node) => setActive(node.data)}
//                 onFocus={(node) => setFocused(node.data)}
//                 onToggle={() => {
//                   setTimeout(() => {
//                     setCount(tree?.visibleNodes.length ?? 0);
//                   });
//                 }}
//               >
//                 {Node}
//               </Tree>
//             )}
//           </FillFlexParent>
//         </div>
//         <div className={styles.contentContainer}>
//           <h1>React Arborist Cities Demo</h1>
//           <p className={styles.mobileWarning}>
//             Heads up! <br />
//             This site works best on a desktop screen.
//           </p>
//           <p>
//             In this demo, we hook into some callbacks, use the tree ref api, and
//             render a large number of nodes.{" "}
//           </p>
//           <section>
//             <label>
//               Demo the <i>selection</i> prop:
//             </label>
//             <button
//               onClick={() =>
//                 setActive({ id: "1840021543.", name: "San Francisco" })
//               }
//             >
//               Select San Francisco
//             </button>
//           </section>
//           <section>
//             <label>
//               Demo the <i>searchTerm</i> prop:
//             </label>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.currentTarget.value)}
//             />
//           </section>
//           <section>
//             <label>
//               Demo the <i>selectionFollowsFocus</i> prop:
//             </label>
//             <input
//               type="checkbox"
//               checked={followsFocus}
//               onChange={(e) => setFollowsFocus((v) => !v)}
//             />
//           </section>
//           <section>
//             <label>
//               Demo the <i>disableMultiSelection</i> prop:
//             </label>
//             <input
//               type="checkbox"
//               checked={disableMulti}
//               onChange={(e) => setDisableMulti((v) => !v)}
//             />
//           </section>
//           <section>
//             <label>
//               Demo the <i>tree</i> ref:
//             </label>
//             <div className={styles.buttonRow}>
//               <button onClick={() => tree?.selectAll()}>Select All</button>
//               <button onClick={() => tree?.deselectAll()}>Select None</button>
//             </div>
//             <div className={styles.buttonRow}>
//               <button onClick={() => tree?.openAll()}>Open All</button>
//               <button onClick={() => tree?.closeAll()}>Close All</button>
//             </div>
//           </section>
//           <div className={styles.statsgrid}>
//             <section className={styles.infobox}>
//               <label>Focused:</label>
//               <div className={styles.stat}>{focused?.name ?? "(none)"}</div>
//             </section>

//             <section className={styles.infobox}>
//               <label>Active:</label>
//               <div className={styles.stat}>{active?.name ?? "(none)"}</div>
//             </section>

//             <section className={styles.infobox}>
//               <label>Visible Nodes:</label>
//               <div className={styles.stat}>{count}</div>
//             </section>

//             <section className={styles.infobox}>
//               <label>Selected Items:</label>
//               <div className={styles.stat}>{selectedCount}</div>
//             </section>
//           </div>
//           <p>
//             <Link href="/">Back To Demos</Link>
//           </p>
//           <p>
//             <Link href="https://github.com/brimdata/react-arborist">
//               Go to Docs
//             </Link>
//           </p>
//           <p>
//             <Link href="https://twitter.com/specialcasedev">
//               Follow on Twitter
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Node({ node, style, dragHandle }: NodeRendererProps<Data>) {
//   const Icon = node.isInternal ? BsMapFill : BsGeoFill;
//   const indentSize = Number.parseFloat(`${style.paddingLeft || 0}`);

//   return (
//     <div
//       ref={dragHandle}
//       style={style}
//       className={clsx(styles.node, node.state)}
//       onClick={() => node.isInternal && node.toggle()}
//     >
//       <div className={styles.indentLines}>
//         {new Array(indentSize / INDENT_STEP).fill(0).map((_, index) => {
//           return <div key={index}></div>;
//         })}
//       </div>
//       <FolderArrow node={node} />
//       <Icon className={styles.icon} />{" "}
//       <span className={styles.text}>
//         {node.isEditing ? <Input node={node} /> : node.data.name}
//       </span>
//     </div>
//   );
// }

// function Input({ node }: { node: NodeApi<Data> }) {
//   return (
//     <input
//       autoFocus
//       name="name"
//       type="text"
//       defaultValue={node.data.name}
//       onFocus={(e) => e.currentTarget.select()}
//       onBlur={() => node.reset()}
//       onKeyDown={(e) => {
//         if (e.key === "Escape") node.reset();
//         if (e.key === "Enter") node.submit(e.currentTarget.value);
//       }}
//     />
//   );
// }

// function sortData(data: Data[]) {
//   function sortIt(data: Data[]) {
//     data.sort((a, b) => (a.name < b.name ? -1 : 1));
//     data.forEach((d) => {
//       if (d.children) sortIt(d.children);
//     });
//     return data;
//   }
//   return sortIt(data);
// }

// function FolderArrow({ node }: { node: NodeApi<Data> }) {
//   return (
//     <span className={styles.arrow}>
//       {node.isInternal ? (
//         node.isOpen ? (
//           <MdArrowDropDown />
//         ) : (
//           <MdArrowRight />
//         )
//       ) : null}
//     </span>
//   );
// }
