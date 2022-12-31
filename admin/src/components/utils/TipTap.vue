<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  emits: ['update:modelValue'],

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<template>
  <div
    v-if="editor"
    id="editor"
  >
    <VBtn
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      bold
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      italic
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      strike
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      code
    </VBtn>
    <VBtn @click="editor.chain().focus().unsetAllMarks().run()">clear marks</VBtn>
    <VBtn @click="editor.chain().focus().clearNodes().run()">clear nodes</VBtn>
    <VBtn
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      paragraph
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      h1
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      h3
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      h4
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
    >
      h5
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      h6
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      bullet list
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      ordered list
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      code block
    </VBtn>
    <VBtn
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      blockquote
    </VBtn>
    <VBtn @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</VBtn>
    <VBtn @click="editor.chain().focus().setHardBreak().run()">hard break</VBtn>
    <VBtn
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      undo
    </VBtn>
    <VBtn
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      redo
    </VBtn>
    <EditorContent
      :editor="editor"
      class="textarea"
    />
  </div>
</template>

<style scoped lang="scss">
.v-btn--size-default {
  height: 24px;
}

.v-btn {
  letter-spacing: 0;
  font-weight: 400;
  padding: 0;
}

button {
  padding: 0 5px !important;
  margin-right: 5px;
  margin-bottom: 5px;
  min-width: auto !important;
}

/* beginning of custom section */

#editor {
  border: 2px solid purple !important;
  border-radius: 10px;
  padding: 10px 10px;

  .textarea {
    margin-top: 20px;

    &::v-deep(.ProseMirror) {
      outline: none;
    }
  }
}

/* end of custom section */

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  a {
    color: #68cef8;
  }

  code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }
}
</style>
