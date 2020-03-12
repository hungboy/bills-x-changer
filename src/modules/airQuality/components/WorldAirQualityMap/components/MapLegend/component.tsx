import React, { useEffect, useRef } from 'react';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import * as d3 from 'd3';

const DEFAULT_STOP_COUNT = 10;

export interface IMapLegendProps {
  colorScalar: ScaleLinear<string, string>;
  max: number;
  min: number;
  width: number;
  height: number;
  subtitle: string;

  parentElementIDSelector: string;
}

export const MapLegend = ({
  colorScalar,
  max,
  min,
  width,
  height,
  subtitle,

  parentElementIDSelector
}: IMapLegendProps) => {
  const legendContainerRef = useRef<
    d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  >();
  const legendBarDefinitionRef = useRef<
    d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
  >();
  const legendBarRef = useRef<
    d3.Selection<SVGRectElement, unknown, HTMLElement, any>
  >();
  const legendAxisRef = useRef<
    d3.Selection<SVGGElement, unknown, HTMLElement, any>
  >();
  const subtitleRef = useRef<
    d3.Selection<SVGTextElement, unknown, HTMLElement, any>
  >();
  const axisHeight = 15;
  const legendVerticalPadding = 20;
  const legendHorizontalPadding = 20;
  const barWidth = width - legendHorizontalPadding * 2;
  const barHeight = Math.ceil(height / 2) - axisHeight;

  // Append Legend Container
  useEffect(() => {
    if (typeof legendContainerRef.current === 'undefined') {
      legendContainerRef.current = d3
        .select(parentElementIDSelector)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'map-legend')
        .attr('style', 'position:absolute;bottom:20px;right:20px;z-index:500');

      legendContainerRef.current
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', '#ffffff');
    }
  }, [legendContainerRef, height, width, parentElementIDSelector]);

  //Append Legend Bar Definition
  useEffect(() => {
    const clearLinearGradientDefinitions = (
      definitionRef: React.MutableRefObject<
        d3.Selection<SVGDefsElement, unknown, HTMLElement, any> | undefined
      >
    ) => {
      definitionRef.current?.select('linearGradient').remove();
    };

    const addDefinitions = (
      definitionRef: React.MutableRefObject<
        d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
      >,
      scalar: ScaleLinear<string, string>,
      min: number,
      max: number,
      stops: number
    ) => {
      const gradientDef = definitionRef.current
        .append('svg:linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '100%')
        .attr('x2', '100%')
        .attr('y2', '100%')
        .attr('spreadMethod', 'pad');

      let index = 0;

      do {
        const stopPercentage = index / stops;
        const stopValue = (max - min) * stopPercentage + min;
        const stopColor = scalar(stopValue);
        const stopPercentageOffset = `${(stopPercentage * 100).toFixed(2)}%`;

        gradientDef
          .append('stop')
          .attr('offset', stopPercentageOffset)
          .attr('stop-color', stopColor)
          .attr('stop-opacity', 1);
        index++;
      } while (index < stops);
    };

    if (typeof legendContainerRef.current === 'undefined') {
      return;
    }

    if (typeof legendBarDefinitionRef.current === 'undefined') {
      legendBarDefinitionRef.current = legendContainerRef.current.append(
        'defs'
      );

      addDefinitions(
        legendBarDefinitionRef as React.MutableRefObject<
          d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
        >,
        colorScalar,
        min,
        max,
        DEFAULT_STOP_COUNT
      );
    } else {
      clearLinearGradientDefinitions(legendBarDefinitionRef);
      addDefinitions(
        legendBarDefinitionRef as React.MutableRefObject<
          d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
        >,
        colorScalar,
        min,
        max,
        DEFAULT_STOP_COUNT
      );
    }
  }, [legendBarDefinitionRef, legendContainerRef, min, max, colorScalar]);

  //Append Axis

  useEffect(() => {
    const removeAxis = (
      legendContainer: React.MutableRefObject<
        d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined
      >
    ) => {
      if (legendContainer.current) {
        legendContainer.current.select('g.axis').remove();
      }
    };

    const addAxis = (
      legendContainer: React.MutableRefObject<
        d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined
      >,
      legendAxis: React.MutableRefObject<
        d3.Selection<SVGGElement, unknown, HTMLElement, any>
      >,
      min: number,
      max: number,
      stops: number,
      scalar: ScaleLinear<string, string>
    ) => {
      if (legendContainer.current) {
        const axisBottom: any = d3.axisBottom;

        const convertedScalar = scaleLinear()
          .domain(scalar.domain())
          .range([0, barWidth]);
        const axis = axisBottom()
          .scale(convertedScalar)
          .tickArguments([stops - 1, 's']);

        legendAxis.current = legendContainer.current
          .append('g')
          .attr('class', 'axis')
          .attr(
            'transform',
            `translate(${legendHorizontalPadding},${barHeight +
              legendVerticalPadding})`
          )
          .call(axis);
      }
    };

    if (legendContainerRef.current) {
      if (legendAxisRef && legendAxisRef.current) {
        removeAxis(legendContainerRef);
      }

      addAxis(
        legendContainerRef,
        legendAxisRef as React.MutableRefObject<
          d3.Selection<SVGGElement, unknown, HTMLElement, any>
        >,
        min,
        max,
        DEFAULT_STOP_COUNT,
        colorScalar
      );
    }
  }, [
    min,
    max,
    legendAxisRef,
    legendContainerRef,
    colorScalar,
    barHeight,
    barWidth
  ]);

  // Append Bar
  useEffect(() => {
    if (legendContainerRef.current && legendBarRef.current === undefined) {
      legendBarRef.current = legendContainerRef.current
        .append('rect')
        .attr('width', barWidth)
        .attr('height', barHeight)
        .attr(
          'transform',
          `translate(${legendHorizontalPadding},${legendVerticalPadding})`
        )
        .style('fill', 'url(#gradient)');
    }
  }, [legendContainerRef, legendBarRef, barHeight, barWidth]);

  //Append Subtitle
  useEffect(() => {
    const addSubtitle = (
      legendContainer: React.MutableRefObject<
        d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined
      >,
      subtitleRef: React.MutableRefObject<
        d3.Selection<SVGTextElement, unknown, HTMLElement, any> | undefined
      >
    ) => {
      if (legendContainer.current) {
        subtitleRef.current = legendContainer.current
          .append('text')
          .attr('id', 'subtitle')
          .attr(
            'transform',
            `translate(${legendHorizontalPadding},${height - axisHeight})`
          )
          .attr('font-size', 10)
          .text(subtitle);
      }
    };

    const removeSubtitle = (
      subtitleRef: React.MutableRefObject<
        d3.Selection<SVGTextElement, unknown, HTMLElement, any> | undefined
      >
    ) => {
      if (subtitleRef.current) {
        subtitleRef.current.remove();
      }
    };
    if (legendContainerRef.current) {
      if (subtitleRef.current) {
        removeSubtitle(subtitleRef);
      }
      addSubtitle(legendContainerRef, subtitleRef);
    }
  }, [subtitle, legendContainerRef, subtitleRef, height]);

  return null;
};
