import { useState } from "react";
import "./styles.css"

type TabData = {
  id: string | number;
  label: string;
  description: number;
}

type TabsProps = {
  data: Array<TabData>
}

export default function Tabs({ data }: TabsProps) {
  const [activeId, setActiveId] = useState(data[0].id);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const tabId = e.target.dataset.id;
    setActiveId(tabId);
  }

  //  React.KeyboardEventHandler<HTMLDivElement>
  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>){
    const index = +e.target.dataset.index
    console.log(e.key, index)

    const nextIndex = getNextIndex(e.key, index)
    if(nextIndex === -1) return

    e.preventDefault()
    const selectItem = data[nextIndex]
    setActiveId(selectItem.id)

    // focus on that button
    const btnId = createTabButtonId(selectItem.id)
    document.getElementById(btnId)?.focus()
  }

  // based on event.key pressed find the nextIndex
  function getNextIndex(key: string, index: number){
    const config = {
      ArrowLeft: (i: number) => i-1,
      ArrowRight: (i: number) => i+1,
      Home: () => 0,
      End: () => data.length - 1
    }

    if(!config[key]) return -1

    return clampIndex(config[key](index))
  }

  function clampIndex(i: number){
    if(i < 0) return data.length - 1;
    if(i >= data.length) return 0;
    return i
  }

  function renderButtons() {
    return data.map((item, i) => {
      const btnId = createTabButtonId(item.id);
      const panelId = createPanelId(item.id);

      const isActiveTab = activeId == item.id
      
      const classes = ['tab-button']
      if(isActiveTab) classes.push('active-button')

      return (
        <button
          key={item.id}
          id={btnId}
          className={classes.join(' ')}
          aria-controls={panelId}
          data-id={item.id}
          data-index={i}
          onClick={handleClick}
          aria-selected={isActiveTab}
          role="tab"
          tabIndex={isActiveTab ? undefined : -1}
        >
          {item.label}
        </button>
      );
    });
  }

  function renderPanels() {
    return data.map((item) => {
     return <TabPanel key={item.id} item={item} isActive={item.id === activeId} />
    });
  }

  return (
    <div className="container">
      <div className="tab-list" role="tablist" onKeyDown={handleKeyDown}>{renderButtons()}</div>
      <div className="content-panels">{renderPanels()}</div>
    </div>
  );
}


type TabPanelProps = {
  item: TabData;
  isActive: boolean;
}
function TabPanel({item, isActive}: TabPanelProps){
  const panelId = createPanelId(item.id);
  const btnId = createTabButtonId(item.id);

  return (
    <div
      key={item.id}
      id={panelId}
      className="tab-panel"
      role="tabpanel"
      aria-labelledby={btnId}
      // we could use hidden attribute to hide this div, then we won't require show/hide using separate css class
      hidden={!isActive}
    >
      {item.description}
    </div>
  )
}

function createTabButtonId(id: TabData['id']) {
  return `button-${id}`;
}

function createPanelId(id: TabData['id']){
  return `panel-${id}`
}