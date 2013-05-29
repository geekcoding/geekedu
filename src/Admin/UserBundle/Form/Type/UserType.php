<?php

namespace Admin\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ODM\MongoDB\DocumentRepository;

class UserType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder->add('username','text',array(
            'label' => '用户名:',
            'attr' => array(
                'placeholder' => '请输入用户名'
            )
        ))->add('userimg','file',array(
            'label' => '用户头像:'
        ))->add('realname','text',array(
            'label' => '真实姓名:',
            'attr' => array(
                'placeholder' => '请输入真实姓名'
            )
        ))->add('email','email',array(
            'label' => 'Email地址:',
            'attr' => array(
                'placeholder' => '请输入邮箱地址'
            )
        ))->add('password','text',array(
            'label' => '用户密码:',
            'attr' => array(
                'placeholder' => '请输入密码'
            )
        ))->add('gander','choice',array(
            'choices' => array('0' => '男','' => '女'),
            'label' => '用户性别:',
            'expanded' => true, 
            'multiple' => false,
            'data' => '0'
        ))->add('description','textarea',array(
            'label' => '用户简介:'
        ))->add('enabled','choice',array(
            'choices' => array('true' => '激活'),
            'label' => '是否激活:',
            'expanded' => true, 
            'multiple' => true
        ))->add('groups', 'document', array(
            'class' => 'Site\UserBundle\Document\Group',
            'property' => 'name',
            'multiple' => true,
            'label' => '所属用户组:'
        ));
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'Site\UserBundle\Document\User',
        ));
    }

    public function getName() {
        return 'user';
    }

}