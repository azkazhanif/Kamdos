import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type Task } from "../../types";

interface TimelineViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ tasks, onEditTask }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getColor = (id: string) => {
    const colors = [
      "#3b82f6", // Blue
      "#10b981", // Emerald
      "#f59e0b", // Amber
      "#8b5cf6", // Violet
      "#ec4899", // Pink
      "#06b6d4", // Cyan
      "#6366f1", // Indigo
      "#f97316", // Orange
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || tasks.length === 0) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    // Filter valid tasks with dates
    const validTasks = tasks
      .filter((t) => t.startDate && t.dueDate)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

    if (validTasks.length === 0) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", 200);
      svg
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .text("No tasks with valid Start and Due dates to display.");
      return;
    }

    // Dimensions
    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 40, right: 30, bottom: 30, left: 200 };
    const barHeight = 40;
    const gap = 10;
    const width = containerWidth - margin.left - margin.right;
    const height =
      (barHeight + gap) * validTasks.length + margin.top + margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", height)
      .attr("viewBox", `0 0 ${containerWidth} ${height}`);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const minDate =
      d3.min(validTasks, (d) => new Date(d.startDate)) || new Date();
    const maxDate =
      d3.max(validTasks, (d) => new Date(d.dueDate)) || new Date();
    // Add buffer to dates
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);

    const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(validTasks.map((t) => t.id))
      .range([0, validTasks.length * (barHeight + gap)])
      .padding(0.2);

    // Axes
    const xAxis = d3
      .axisTop(xScale)
      .ticks(5)
      .tickFormat((d: any) => d3.timeFormat("%b %d")(d));

    chart
      .append("g")
      .attr("class", "x-axis")
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
      .call((g) =>
        g.selectAll("text").attr("fill", "#64748b").attr("font-size", "12px")
      );

    // Grid lines
    chart
      .append("g")
      .attr("class", "grid")
      .attr(
        "transform",
        `translate(0,${validTasks.length * (barHeight + gap)})`
      )
      .call(
        d3
          .axisBottom(xScale)
          .ticks(5)
          .tickSize(-validTasks.length * (barHeight + gap))
          .tickFormat(() => "")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "#f1f5f9"));

    // Bars
    const bars = chart
      .selectAll(".bar-group")
      .data(validTasks)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(0, ${yScale(d.id)})`)
      .style("cursor", "pointer")
      .on("click", (e, d) => onEditTask(d));

    // Bar Rect
    bars
      .append("rect")
      .attr("x", (d) => xScale(new Date(d.startDate)))
      .attr("width", (d) =>
        Math.max(5, xScale(new Date(d.dueDate)) - xScale(new Date(d.startDate)))
      )
      .attr("height", barHeight)
      .attr("rx", 6)
      .attr("fill", (d) => getColor(d.id))
      .attr("opacity", 0.9)
      .on("mouseover", function () {
        d3.select(this).attr("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 0.9);
      });

    // Task Label (Left Side)
    svg
      .append("g")
      .attr("transform", `translate(${margin.left - 10}, ${margin.top})`)
      .selectAll("text")
      .data(validTasks)
      .enter()
      .append("text")
      .attr("y", (d) => (yScale(d.id) || 0) + barHeight / 2)
      .attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .text((d) => d.title)
      .attr("fill", "#334155")
      .attr("font-size", "13px")
      .style("font-weight", "500")
      .each(function (d) {
        const self = d3.select(this);
        const textLength = self.node()?.getComputedTextLength() || 0;
        if (textLength > margin.left - 20) {
          self.text(d.title.substring(0, 20) + "...");
        }
      });
  }, [tasks, onEditTask]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-4"
    >
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Project Timeline
      </h3>
      <div className="w-full overflow-x-auto custom-scrollbar">
        <svg ref={svgRef} className="w-full block"></svg>
      </div>
    </div>
  );
};

export default TimelineView;
