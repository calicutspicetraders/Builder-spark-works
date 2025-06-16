import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "logo" | "plugin" | "custom";
  name: string;
  content: any;
  page: string;
  position: string;
  isActive: boolean;
  metadata?: {
    className?: string;
    style?: Record<string, any>;
    responsive?: {
      mobile?: boolean;
      tablet?: boolean;
      desktop?: boolean;
    };
  };
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  code: string;
  type: "component" | "script" | "style";
  isActive: boolean;
  pages: string[];
}

interface DynamicContentRendererProps {
  page: string;
  position: string;
  defaultContent?: React.ReactNode;
  className?: string;
}

const DynamicContentRenderer: React.FC<DynamicContentRendererProps> = ({
  page,
  position,
  defaultContent,
  className = "",
}) => {
  const [renderedPlugins, setRenderedPlugins] = useState<Set<string>>(
    new Set(),
  );

  // Fetch content blocks and plugins for this page/position
  const { data: contentData, isLoading } = useQuery({
    queryKey: ["content-blocks", page, position],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/superadmin/preview?page=${page}`);
        if (!response.ok) {
          // If API not available, return empty data instead of throwing
          console.warn(
            `API endpoint not available: /api/superadmin/preview?page=${page}`,
          );
          return { content_blocks: [], plugins: [], settings: {} };
        }
        return response.json();
      } catch (error) {
        // Fallback to empty data if fetch fails
        console.warn("Content API not available, using fallback data:", error);
        return { content_blocks: [], plugins: [], settings: {} };
      }
    },
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: false,
    retry: false, // Don't retry failed requests
  });

  // Get content blocks for this position
  const contentBlocks = useMemo(() => {
    if (!contentData?.content_blocks) return [];

    return contentData.content_blocks.filter(
      (block: ContentBlock) =>
        block.page === page && block.position === position && block.isActive,
    );
  }, [contentData, page, position]);
  const plugins = useMemo(() => {
    if (!contentData?.plugins) return [];

    return contentData.plugins.filter(
      (plugin: Plugin) =>
        plugin.isActive &&
        (plugin.pages.length === 0 || plugin.pages.includes(page)),
    );
  }, [contentData, page]);

  // Apply plugins when they change
  useEffect(() => {
    plugins.forEach((plugin: Plugin) => {
      if (renderedPlugins.has(plugin.id)) return;

      try {
        if (plugin.type === "script") {
          // Execute JavaScript plugins
          const script = document.createElement("script");
          script.textContent = plugin.code;
          script.setAttribute("data-plugin-id", plugin.id);
          document.head.appendChild(script);
        } else if (plugin.type === "style") {
          // Apply CSS plugins
          const style = document.createElement("style");
          style.textContent = plugin.code;
          style.setAttribute("data-plugin-id", plugin.id);
          document.head.appendChild(style);
        }

        setRenderedPlugins((prev) => new Set([...prev, plugin.id]));
      } catch (error) {
        console.error(`Failed to apply plugin ${plugin.name}:`, error);
      }
    });

    // Cleanup removed plugins
    return () => {
      const currentPluginIds = new Set(plugins.map((p) => p.id));
      renderedPlugins.forEach((pluginId) => {
        if (!currentPluginIds.has(pluginId)) {
          // Remove plugin scripts/styles
          const elements = document.querySelectorAll(
            `[data-plugin-id="${pluginId}"]`,
          );
          elements.forEach((el) => el.remove());
        }
      });
    };
  }, [plugins, renderedPlugins]);

  // Render content block based on type
  const renderContentBlock = (block: ContentBlock) => {
    const baseProps = {
      key: block.id,
      className: `dynamic-content-block ${block.metadata?.className || ""} ${className}`,
      style: block.metadata?.style || {},
      "data-content-id": block.id,
    };

    try {
      switch (block.type) {
        case "text":
          return renderTextBlock(block, baseProps);
        case "image":
          return renderImageBlock(block, baseProps);
        case "logo":
          return renderLogoBlock(block, baseProps);
        case "custom":
          return renderCustomBlock(block, baseProps);
        case "plugin":
          return renderPluginBlock(block, baseProps);
        default:
          return null;
      }
    } catch (error) {
      console.error(`Failed to render content block ${block.id}:`, error);
      return (
        <div {...baseProps} className={`${baseProps.className} error-block`}>
          <span className="text-red-500 text-sm">Error rendering content</span>
        </div>
      );
    }
  };

  const renderTextBlock = (block: ContentBlock, baseProps: any) => {
    const { text, tag = "div", styling = {} } = block.content;
    const Tag = tag as keyof JSX.IntrinsicElements;

    return (
      <Tag
        {...baseProps}
        style={{ ...baseProps.style, ...styling }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  const renderImageBlock = (block: ContentBlock, baseProps: any) => {
    const { url, alt = "", width, height, objectFit = "cover" } = block.content;

    return (
      <img
        {...baseProps}
        src={url}
        alt={alt}
        width={width}
        height={height}
        style={{
          ...baseProps.style,
          objectFit,
          maxWidth: "100%",
          height: "auto",
        }}
        loading="lazy"
      />
    );
  };

  const renderLogoBlock = (block: ContentBlock, baseProps: any) => {
    const { url, alt = "Logo", width = 48, height = 48, link } = block.content;

    const logoElement = (
      <img
        {...baseProps}
        src={url}
        alt={alt}
        width={width}
        height={height}
        style={{
          ...baseProps.style,
          maxWidth: "100%",
          height: "auto",
        }}
        loading="eager"
      />
    );

    if (link) {
      return (
        <a href={link} className="inline-block">
          {logoElement}
        </a>
      );
    }

    return logoElement;
  };

  const renderCustomBlock = (block: ContentBlock, baseProps: any) => {
    const { html } = block.content;

    return <div {...baseProps} dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderPluginBlock = (block: ContentBlock, baseProps: any) => {
    const { pluginId, config = {} } = block.content;
    const plugin = plugins.find((p) => p.id === pluginId);

    if (!plugin || plugin.type !== "component") {
      return (
        <div
          {...baseProps}
          className={`${baseProps.className} plugin-not-found`}
        >
          <span className="text-gray-500 text-sm">Plugin not found</span>
        </div>
      );
    }

    try {
      // Create a safe execution context for the plugin component
      const pluginFunction = new Function(
        "React",
        "config",
        "props",
        `
        try {
          ${plugin.code}
        } catch (error) {
          console.error('Plugin execution error:', error);
          return React.createElement('div', { className: 'plugin-error' }, 'Plugin Error');
        }
        `,
      );

      const PluginComponent = pluginFunction(React, config, baseProps);

      if (React.isValidElement(PluginComponent)) {
        return PluginComponent;
      } else {
        return <div {...baseProps}>{PluginComponent}</div>;
      }
    } catch (error) {
      console.error(`Plugin ${plugin.name} execution failed:`, error);
      return (
        <div {...baseProps} className={`${baseProps.className} plugin-error`}>
          <span className="text-red-500 text-sm">Plugin Error</span>
        </div>
      );
    }
  };

  // Check responsive visibility
  const isVisibleOnCurrentDevice = (block: ContentBlock) => {
    if (!block.metadata?.responsive) return true;

    const { responsive } = block.metadata;
    const width = window.innerWidth;

    if (width < 768 && responsive.mobile === false) return false;
    if (width >= 768 && width < 1024 && responsive.tablet === false)
      return false;
    if (width >= 1024 && responsive.desktop === false) return false;

    return true;
  };

  // Handle loading state
  if (isLoading) {
    return defaultContent || null;
  }

  // Filter content blocks by device visibility
  const visibleBlocks = contentBlocks.filter(isVisibleOnCurrentDevice);

  // If no visible blocks, return default content
  if (visibleBlocks.length === 0) {
    return defaultContent || null;
  }

  // Render visible content blocks
  return <>{visibleBlocks.map(renderContentBlock)}</>;
};

// Higher-order component for easy integration
export const withDynamicContent = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  page: string,
  position: string,
) => {
  return (props: P) => (
    <>
      <DynamicContentRenderer page={page} position={`${position}-before`} />
      <WrappedComponent {...props} />
      <DynamicContentRenderer page={page} position={`${position}-after`} />
    </>
  );
};

// Hook for dynamic content management
export const useDynamicContent = (page: string, position?: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dynamic-content", page, position],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/superadmin/preview?page=${page}`);
        if (!response.ok) {
          // If API not available, return empty data instead of throwing
          console.warn(
            `API endpoint not available: /api/superadmin/preview?page=${page}`,
          );
          return { content_blocks: [], plugins: [], settings: {} };
        }
        return response.json();
      } catch (error) {
        // Fallback to empty data if fetch fails
        console.warn("Content API not available, using fallback data:", error);
        return { content_blocks: [], plugins: [], settings: {} };
      }
    },
    staleTime: 30000,
    retry: false, // Don't retry failed requests
  });

  const contentBlocks = useMemo(() => {
    if (!data?.content_blocks) return [];

    if (position) {
      return data.content_blocks.filter(
        (block: ContentBlock) =>
          block.page === page && block.position === position && block.isActive,
      );
    }

    return data.content_blocks.filter(
      (block: ContentBlock) => block.page === page && block.isActive,
    );
  }, [data, page, position]);

  return {
    contentBlocks,
    plugins: data?.plugins || [],
    settings: data?.settings || {},
    isLoading,
    refetch,
  };
};

// Component for specific content positions
interface ContentPositionProps {
  page: string;
  position: string;
  fallback?: React.ReactNode;
  className?: string;
  wrapper?: keyof JSX.IntrinsicElements;
}

export const ContentPosition: React.FC<ContentPositionProps> = ({
  page,
  position,
  fallback,
  className,
  wrapper: Wrapper = "div",
}) => {
  const { contentBlocks, isLoading } = useDynamicContent(page, position);

  if (isLoading || contentBlocks.length === 0) {
    return fallback ? (
      <Wrapper className={className}>{fallback}</Wrapper>
    ) : null;
  }

  return (
    <Wrapper className={className}>
      <DynamicContentRenderer
        page={page}
        position={position}
        defaultContent={fallback}
        className={className}
      />
    </Wrapper>
  );
};

// Utility function to get content value
export const getContentValue = (
  contentBlocks: ContentBlock[],
  name: string,
  defaultValue: any = null,
) => {
  const block = contentBlocks.find(
    (block) => block.name === name && block.isActive,
  );
  return block ? block.content : defaultValue;
};

// Utility function to check if content exists
export const hasContent = (contentBlocks: ContentBlock[], position: string) => {
  return contentBlocks.some(
    (block) => block.position === position && block.isActive,
  );
};

export default DynamicContentRenderer;
